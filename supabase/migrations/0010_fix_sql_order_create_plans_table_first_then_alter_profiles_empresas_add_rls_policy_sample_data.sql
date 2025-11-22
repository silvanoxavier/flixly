-- 1. Create plans table FIRST
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. RLS for plans (public read)
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read plans" ON public.plans FOR SELECT USING (true);

-- 3. Add phone to profiles and plano_id to empresas
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS phone TEXT;
ALTER TABLE public.empresas ADD COLUMN IF NOT EXISTS plano_id UUID REFERENCES public.plans(id);

-- 4. Sample data (clear & insert)
DELETE FROM public.plans;
INSERT INTO public.plans (name, price, description, features) VALUES
('Básico', 29.90, 'Para pequenas empresas', '["WhatsApp", "Chat Web", "5.000 msgs/mês"]'::jsonb),
('Pro', 99.90, 'Para médias empresas', '["Tudo do Básico", "Catálogo", "Kanban", "50.000 msgs/mês"]'::jsonb),
('Enterprise', 299.90, 'Para grandes empresas', '["Tudo do Pro", "Multi-usuário", "API", "Ilimitado"]'::jsonb);