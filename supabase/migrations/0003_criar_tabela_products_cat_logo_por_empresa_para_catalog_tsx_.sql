CREATE TABLE public.products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  category TEXT,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company can view own products" ON public.products 
FOR SELECT TO authenticated USING ((auth.jwt() ->> 'company_id')::uuid = company_id);

CREATE POLICY "Company can manage own products" ON public.products 
FOR ALL TO authenticated USING ((auth.jwt() ->> 'company_id')::uuid = company_id);