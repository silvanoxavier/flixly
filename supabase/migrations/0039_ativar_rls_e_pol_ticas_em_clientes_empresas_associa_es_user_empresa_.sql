ALTER TABLE public.clientes_empresas ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Clientes podem ver suas próprias empresas" ON public.clientes_empresas;
DROP POLICY IF EXISTS "Clientes podem associar-se a empresas" ON public.clientes_empresas;
DROP POLICY IF EXISTS "Clientes podem remover associações" ON public.clientes_empresas;
CREATE POLICY "Users view own associations" ON public.clientes_empresas FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Users insert own associations" ON public.clientes_empresas FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users delete own associations" ON public.clientes_empresas FOR DELETE TO authenticated USING (user_id = auth.uid());