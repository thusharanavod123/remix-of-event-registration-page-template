
CREATE TABLE public.vacancies (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  country text not null,
  city text not null,
  salary text not null default 'TBA',
  job_type text not null default 'Full-time',
  status text not null default 'Open',
  description text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
GRANT SELECT ON public.vacancies TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.vacancies TO authenticated;
GRANT ALL ON public.vacancies TO service_role;
ALTER TABLE public.vacancies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Vacancies are viewable by everyone" ON public.vacancies FOR SELECT USING (true);
CREATE POLICY "Admins manage vacancies" ON public.vacancies FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
GRANT SELECT ON public.faqs TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.faqs TO authenticated;
GRANT ALL ON public.faqs TO service_role;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "FAQs are viewable by everyone" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Admins manage faqs" ON public.faqs FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;
CREATE TRIGGER update_vacancies_updated_at BEFORE UPDATE ON public.vacancies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.vacancies (title,country,city,salary,job_type,status,sort_order) VALUES
('Truck Driver (CE License)','Romania','Bucharest','€1,800 – €2,400 / month','Full-time','Open',1),
('Factory Worker — Production Line','Romania','Cluj-Napoca','€1,100 – €1,400 / month','Full-time','Open',2),
('Warehouse Worker','Romania','Timișoara','€1,000 – €1,300 / month','Full-time','Open',3),
('Truck Driver — International Routes','Romania','Constanța','€2,200 – €2,800 / month','Full-time','Open',4),
('Factory Worker — Assembly','Romania','Iași','€1,050 – €1,350 / month','Full-time','Open',5),
('Warehouse Forklift Operator','Romania','Brașov','€1,200 – €1,500 / month','Full-time','Open',6),
('Warehouse Operative','Hungary','Budapest','TBA','Full-time','Coming soon',7),
('Factory Worker','Poland','Warsaw','TBA','Full-time','Coming soon',8),
('Truck Driver','Bulgaria','Sofia','TBA','Full-time','Coming soon',9);
