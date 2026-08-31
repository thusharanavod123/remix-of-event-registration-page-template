
INSERT INTO public.faqs (question, answer, sort_order) VALUES
('What documents do I need to apply?','A valid passport (at least 6 months validity), an updated CV, and a clean police clearance certificate. Our team will guide you through the full list once you book an appointment.',1),
('How long does the whole process take?','Typically 4–8 weeks from your first appointment to arrival in Romania — depending on document processing and employer requirements. We keep you updated at every stage.',2),
('Are there any fees for your service?','We are fully transparent: you will be told about any legitimate government or visa fees upfront. There are no hidden charges — everything is confirmed in writing before you commit.',3),
('What salaries can I expect?','Truck drivers earn €1,800–€2,800 per month, factory workers €1,100–€1,400, and warehouse workers €1,000–€1,500 — depending on experience and location.',4),
('Is accommodation provided?','Yes. Most employers provide subsidized or free accommodation, and our team helps you arrange housing in every case before you travel.',5),
('Do I need to speak Romanian or English?','No Romanian is required for most roles. Basic English helps and is preferred for some positions — we assess your profile and match you to the right role.',6),
('Do you help with visa and travel arrangements?','Yes — from work permit and visa applications to flights and airport pickup, we coordinate the entire journey so you can travel with confidence.',7);

CREATE OR REPLACE FUNCTION public.claim_first_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE uid uuid := auth.uid();
BEGIN
  IF uid IS NULL THEN RETURN false; END IF;
  IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN RETURN false; END IF;
  INSERT INTO public.user_roles (user_id, role) VALUES (uid, 'admin') ON CONFLICT DO NOTHING;
  RETURN true;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.claim_first_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.claim_first_admin() TO authenticated;
