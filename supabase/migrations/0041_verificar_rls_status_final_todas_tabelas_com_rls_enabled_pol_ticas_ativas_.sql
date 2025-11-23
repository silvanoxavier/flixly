-- Verificação final RLS (execute para confirmar)
SELECT 
  schemaname, 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'empresas', 'conversations', 'messages', 'products', 'orders', 'whatsapp_sessions', 'notifications', 'calendar_events', 'clientes_empresas')
ORDER BY tablename;

-- Listar políticas ativas
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  permissive, 
  roles, 
  cmd, 
  qual 
FROM pg_policies 
WHERE schemaname = 'public' 
ORDER BY tablename, policyname;