-- Careers at EuroBridge: roles for people joining the EuroBridge team.
CREATE TABLE public.company_careers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (char_length(title) BETWEEN 2 AND 120),
  department text NOT NULL CHECK (char_length(department) BETWEEN 2 AND 80),
  location text NOT NULL CHECK (char_length(location) BETWEEN 2 AND 120),
  employment_type text NOT NULL DEFAULT 'Full-time',
  summary text NOT NULL CHECK (char_length(summary) BETWEEN 10 AND 600),
  requirements text,
  application_email text,
  application_url text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'closed')),
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT careers_application_method CHECK (
    status <> 'published' OR application_email IS NOT NULL OR application_url IS NOT NULL
  )
);

ALTER TABLE public.company_careers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published careers are public" ON public.company_careers FOR SELECT TO anon, authenticated
  USING (status = 'published' OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage careers" ON public.company_careers FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
GRANT SELECT ON public.company_careers TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.company_careers TO authenticated;
CREATE TRIGGER update_company_careers_updated_at BEFORE UPDATE ON public.company_careers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

