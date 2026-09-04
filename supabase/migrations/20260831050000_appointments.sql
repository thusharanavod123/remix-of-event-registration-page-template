-- Appointment scheduling for Elladria Lanka Careers.
-- Public visitors use the two RPCs below; only admins can read or manage records.

CREATE TABLE public.availability_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week smallint NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time time NOT NULL,
  end_time time NOT NULL,
  slot_minutes integer NOT NULL DEFAULT 30 CHECK (slot_minutes BETWEEN 10 AND 240),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT availability_valid_window CHECK (end_time > start_time),
  CONSTRAINT availability_one_window_per_day UNIQUE (day_of_week)
);

CREATE TABLE public.blocked_periods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blocked_date date NOT NULL,
  start_time time,
  end_time time,
  reason text,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT blocked_period_complete CHECK (
    (start_time IS NULL AND end_time IS NULL) OR
    (start_time IS NOT NULL AND end_time IS NOT NULL AND end_time > start_time)
  )
);

CREATE TYPE public.appointment_status AS ENUM
  ('pending', 'confirmed', 'completed', 'cancelled', 'no_show');

CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_code text NOT NULL UNIQUE DEFAULT upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 8)),
  customer_name text NOT NULL CHECK (char_length(customer_name) BETWEEN 2 AND 100),
  phone text NOT NULL CHECK (char_length(phone) BETWEEN 7 AND 24),
  email text NOT NULL CHECK (char_length(email) BETWEEN 5 AND 254),
  vacancy_id uuid REFERENCES public.vacancies(id) ON DELETE SET NULL,
  appointment_type text NOT NULL DEFAULT 'general' CHECK (appointment_type IN ('general', 'vacancy')),
  appointment_date date NOT NULL,
  start_time time NOT NULL,
  end_time time NOT NULL,
  message text CHECK (char_length(message) <= 1000),
  status public.appointment_status NOT NULL DEFAULT 'pending',
  admin_notes text CHECK (char_length(admin_notes) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT appointment_valid_window CHECK (end_time > start_time)
);

-- A cancelled appointment frees the slot. All other states continue to reserve it.
CREATE UNIQUE INDEX appointments_active_slot_unique
  ON public.appointments (appointment_date, start_time)
  WHERE status <> 'cancelled';
CREATE INDEX appointments_date_idx ON public.appointments (appointment_date, start_time);
CREATE INDEX blocked_periods_date_idx ON public.blocked_periods (blocked_date);

CREATE TABLE public.admin_notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id uuid NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  title text NOT NULL,
  body text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.availability_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_periods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage availability" ON public.availability_rules FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage blocked periods" ON public.blocked_periods FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage appointments" ON public.appointments FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage notifications" ON public.admin_notifications FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.availability_rules, public.blocked_periods,
  public.appointments, public.admin_notifications TO authenticated;

CREATE TRIGGER update_availability_rules_updated_at BEFORE UPDATE ON public.availability_rules
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.availability_rules (day_of_week, start_time, end_time, slot_minutes)
SELECT day, '09:00'::time, '17:00'::time, 30 FROM generate_series(1, 5) AS day;

CREATE OR REPLACE FUNCTION public.get_available_appointment_slots(p_date date)
RETURNS TABLE(slot_time time)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH rule AS (
    SELECT start_time, end_time, slot_minutes
    FROM availability_rules
    WHERE day_of_week = extract(dow FROM p_date)::smallint AND is_active
  ), slots AS (
    SELECT gs::time AS slot_time,
           (gs + make_interval(mins => rule.slot_minutes))::time AS slot_end
    FROM rule
    CROSS JOIN LATERAL generate_series(
      p_date + rule.start_time,
      p_date + rule.end_time - make_interval(mins => rule.slot_minutes),
      make_interval(mins => rule.slot_minutes)
    ) gs
  )
  SELECT slots.slot_time
  FROM slots
  WHERE p_date >= (now() AT TIME ZONE 'Asia/Colombo')::date
    AND (p_date > (now() AT TIME ZONE 'Asia/Colombo')::date
      OR slots.slot_time > (now() AT TIME ZONE 'Asia/Colombo')::time)
    AND NOT EXISTS (
      SELECT 1 FROM blocked_periods b
      WHERE b.blocked_date = p_date
        AND (b.start_time IS NULL OR (slots.slot_time < b.end_time AND slots.slot_end > b.start_time))
    )
    AND NOT EXISTS (
      SELECT 1 FROM appointments a
      WHERE a.appointment_date = p_date
        AND a.start_time = slots.slot_time
        AND a.status <> 'cancelled'
    )
  ORDER BY slots.slot_time;
$$;

GRANT EXECUTE ON FUNCTION public.get_available_appointment_slots(date) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.book_appointment(
  p_customer_name text,
  p_phone text,
  p_email text,
  p_appointment_date date,
  p_start_time time,
  p_vacancy_id uuid DEFAULT NULL,
  p_message text DEFAULT NULL
)
RETURNS TABLE(appointment_id uuid, reference_code text)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_slot_minutes integer;
  v_end_time time;
  v_id uuid;
  v_reference text;
BEGIN
  IF trim(p_customer_name) = '' OR char_length(trim(p_customer_name)) NOT BETWEEN 2 AND 100 THEN
    RAISE EXCEPTION 'Please enter a valid name.' USING ERRCODE = '22023';
  END IF;
  IF p_email !~* '^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$' THEN
    RAISE EXCEPTION 'Please enter a valid email address.' USING ERRCODE = '22023';
  END IF;
  IF p_phone !~ '^\+?[0-9 ()-]{7,24}$' THEN
    RAISE EXCEPTION 'Please enter a valid phone number.' USING ERRCODE = '22023';
  END IF;

  -- Serializes booking attempts for the same date, then validates against live availability.
  PERFORM pg_advisory_xact_lock(hashtext(p_appointment_date::text));
  SELECT ar.slot_minutes INTO v_slot_minutes
  FROM availability_rules ar
  WHERE ar.day_of_week = extract(dow FROM p_appointment_date)::smallint
    AND ar.is_active
    AND p_start_time >= ar.start_time
    AND p_start_time + make_interval(mins => ar.slot_minutes) <= ar.end_time;

  IF v_slot_minutes IS NULL OR NOT EXISTS (
    SELECT 1 FROM get_available_appointment_slots(p_appointment_date) s WHERE s.slot_time = p_start_time
  ) THEN
    RAISE EXCEPTION 'That appointment slot is no longer available.' USING ERRCODE = 'P0001';
  END IF;

  v_end_time := p_start_time + make_interval(mins => v_slot_minutes);
  INSERT INTO appointments (
    customer_name, phone, email, vacancy_id, appointment_type,
    appointment_date, start_time, end_time, message
  ) VALUES (
    trim(p_customer_name), trim(p_phone), lower(trim(p_email)), p_vacancy_id,
    CASE WHEN p_vacancy_id IS NULL THEN 'general' ELSE 'vacancy' END,
    p_appointment_date, p_start_time, v_end_time, nullif(trim(p_message), '')
  ) RETURNING id, appointments.reference_code INTO v_id, v_reference;

  INSERT INTO admin_notifications (appointment_id, title, body)
  VALUES (v_id, 'New appointment request', trim(p_customer_name) || ' requested ' ||
          p_appointment_date::text || ' at ' || to_char(p_start_time, 'HH24:MI'));

  RETURN QUERY SELECT v_id, v_reference;
END;
$$;

GRANT EXECUTE ON FUNCTION public.book_appointment(text, text, text, date, time, uuid, text)
  TO anon, authenticated;

-- Realtime can be enabled for these records when the project is connected.
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments, public.admin_notifications;

REVOKE EXECUTE ON FUNCTION public.claim_first_admin() FROM authenticated;
