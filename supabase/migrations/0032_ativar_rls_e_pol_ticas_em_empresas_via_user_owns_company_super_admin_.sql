ALTER TABLE public.empresas ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Empresas são visíveis para todos os usuários autenticados" ON public.empresas;
DROP POLICY IF EXISTS "Usuários autenticados podem inserir empresas" ON public.empresas;
DROP POLICY IF EXISTS "Usuários podem atualizar empresas" ON public.empresas;
CREATE POLICY "Users view own empresas" ON public.empresas FOR SELECT TO authenticated USING (public.user_owns_company(id) OR public.is_super_admin(auth.uid()));
CREATE POLICY "Users insert own empresas" ON public.empresas FOR INSERT TO authenticated WITH CHECK (true); -- Criação pública, associe depois
CREATE POLICY "Users update own empresas" ON public.empresas FOR UPDATE TO authenticated USING (public.user_owns_company(id));
CREATE POLICY "Super admins delete empresas" ON public.empresas FOR DELETE TO authenticated USING (public.is_super_admin(auth.uid()));