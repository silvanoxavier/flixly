ALTER TABLE public.whatsapp_sessions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Companies can view their own whatsapp sessions." ON public.whatsapp_sessions;
DROP POLICY IF EXISTS "Companies can insert their own whatsapp sessions." ON public.whatsapp_sessions;
DROP POLICY IF EXISTS "Companies can update their own whatsapp sessions." ON public.whatsapp_sessions;
CREATE POLICY "Users manage own company whatsapp sessions" ON public.whatsapp_sessions FOR ALL TO authenticated USING (public.user_owns_company(company_id)) WITH CHECK (public.user_owns_company(company_id));