ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Company can view own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Company can insert own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Company can update own conversations" ON public.conversations;
CREATE POLICY "Users view own company conversations" ON public.conversations FOR SELECT TO authenticated USING (public.user_owns_company(company_id));
CREATE POLICY "Users insert own company conversations" ON public.conversations FOR INSERT TO authenticated WITH CHECK (public.user_owns_company(company_id));
CREATE POLICY "Users update own company conversations" ON public.conversations FOR UPDATE TO authenticated USING (public.user_owns_company(company_id));