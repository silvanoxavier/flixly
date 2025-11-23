-- 0029_full_rls_multiuser_isolation.sql
-- Ativa RLS completo para multi-user isolation
-- Executar no Supabase SQL Editor

-- Função auxiliar para verificar se user owns company (via profiles.empresa_id)
CREATE OR REPLACE FUNCTION public.user_owns_company(p_company_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.empresa_id = p_company_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PROFILES (usuário só acessa próprio perfil)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR ALL USING (user_id = auth.uid());

-- 2. EMPRESAS (select/insert own companies via profile)
ALTER TABLE public.empresas ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users own empresas" ON public.empresas;
CREATE POLICY "Users can manage own empresas" ON public.empresas
  FOR ALL USING (id IN (SELECT empresa_id FROM public.profiles WHERE user_id = auth.uid()))
  WITH CHECK (id IN (SELECT empresa_id FROM public.profiles WHERE user_id = auth.uid()));

-- 3. CONVERSATIONS (por company_id)
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Company conversations" ON public.conversations;
CREATE POLICY "Users view own company conversations" ON public.conversations
  FOR ALL USING (public.user_owns_company(company_id))
  WITH CHECK (public.user_owns_company(company_id));

-- 4. MESSAGES (realtime, por company_id)
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Company messages realtime" ON public.messages;
CREATE POLICY "Users view own company messages" ON public.messages
  FOR ALL USING (public.user_owns_company(company_id))
  WITH CHECK (public.user_owns_company(company_id));

-- 5. PRODUCTS (catálogo por company)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Company products" ON public.products;
CREATE POLICY "Users manage own company products" ON public.products
  FOR ALL USING (public.user_owns_company(company_id))
  WITH CHECK (public.user_owns_company(company_id));

-- 6. ORDERS (kanban por company)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Company orders" ON public.orders;
CREATE POLICY "Users manage own company orders" ON public.orders
  FOR ALL USING (public.user_owns_company(company_id))
  WITH CHECK (public.user_owns_company(company_id));

-- 7. WHATSAPP_SESSIONS (instâncias por company)
ALTER TABLE public.whatsapp_sessions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Company whatsapp sessions" ON public.whatsapp_sessions;
CREATE POLICY "Users manage own company sessions" ON public.whatsapp_sessions
  FOR ALL USING (public.user_owns_company(company_id))
  WITH CHECK (public.user_owns_company(company_id));

-- 8. NOTIFICATIONS (já tem user_id, reforçar)
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "User notifications realtime" ON public.notifications;
CREATE POLICY "Users view own notifications" ON public.notifications
  FOR ALL USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- 9. CALENDAR_EVENTS (agendamento por company)
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Company calendar" ON public.calendar_events;
CREATE POLICY "Users manage own company events" ON public.calendar_events
  FOR ALL USING (public.user_owns_company(company_id))
  WITH CHECK (public.user_owns_company(company_id));

-- Indexes para performance em RLS filters
CREATE INDEX IF NOT EXISTS idx_profiles_user_empresa ON public.profiles (user_id, empresa_id);
CREATE INDEX IF NOT EXISTS idx_messages_company_conv ON public.messages (company_id, conversation_id) WHERE read_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_conversations_company_unread ON public.conversations (company_id) WHERE unread_count > 0;

-- Realtime subscriptions otimizadas (já funcionam com RLS)
-- Teste: npx supabase db push (ou Dashboard > Apply migration)