-- Enable RLS on key tables (idempotent)
DO $$
DECLARE
  table_rec RECORD;
  tables TEXT[] := ARRAY['conversations', 'messages', 'products', 'orders', 'whatsapp_sessions', 'calendar_events'];
BEGIN
  FOREACH table_rec IN ARRAY tables
  LOOP
    EXECUTE 'ALTER TABLE IF EXISTS public.' || quote_ident(table_rec) || ' ENABLE ROW LEVEL SECURITY;';
  END LOOP;
END $$;

-- Policy genérica para tabelas company-owned (user tem empresa via profiles)
-- Assumindo profiles: user_id (auth.uid()), empresa_id = company_id
DO $$
DECLARE
  table_rec RECORD;
  tables TEXT[] := ARRAY['conversations', 'messages', 'products', 'orders', 'whatsapp_sessions', 'calendar_events'];
BEGIN
  FOREACH table_rec IN ARRAY tables
  LOOP
    EXECUTE 'DROP POLICY IF EXISTS "Company users can access own data" ON public.' || quote_ident(table_rec) || ';';
    EXECUTE '
      CREATE POLICY "Company users can access own data" ON public.' || quote_ident(table_rec) || '
      FOR ALL
      USING (company_id IN (SELECT empresa_id FROM public.profiles WHERE user_id = auth.uid()))
      WITH CHECK (company_id IN (SELECT empresa_id FROM public.profiles WHERE user_id = auth.uid()));
    ';
  END LOOP;
END $$;

-- Notificações (user_id direto)
DROP POLICY IF EXISTS "Users see own notifications" ON public.notifications;
ALTER TABLE IF EXISTS public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users see own notifications" ON public.notifications
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- Profiles/empresas: super_admin full access, others own
-- (Ajuste se necessário baseado em role na migração 0011+)
DROP POLICY IF EXISTS "Users manage own profile" ON public.profiles;
ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own profile" ON public.profiles
  FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());