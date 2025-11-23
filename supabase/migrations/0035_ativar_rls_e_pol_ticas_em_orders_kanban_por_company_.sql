ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Company can manage own orders" ON public.orders;
CREATE POLICY "Users manage own company orders" ON public.orders FOR ALL TO authenticated USING (public.user_owns_company(company_id)) WITH CHECK (public.user_owns_company(company_id));