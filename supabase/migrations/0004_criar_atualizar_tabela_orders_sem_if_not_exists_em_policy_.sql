DROP TABLE IF EXISTS public.orders CASCADE;
CREATE TABLE public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  status TEXT DEFAULT 'novo' NOT NULL,
  total DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE IF EXISTS public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Company can manage own orders" ON public.orders;
CREATE POLICY "Company can manage own orders" ON public.orders 
FOR ALL TO authenticated USING ((auth.jwt() ->> 'company_id')::uuid = company_id);