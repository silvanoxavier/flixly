ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Company can view own products" ON public.products;
DROP POLICY IF EXISTS "Company can manage own products" ON public.products;
CREATE POLICY "Users view own company products" ON public.products FOR SELECT TO authenticated USING (public.user_owns_company(company_id));
CREATE POLICY "Users manage own company products" ON public.products FOR ALL TO authenticated USING (public.user_owns_company(company_id)) WITH CHECK (public.user_owns_company(company_id));