-- Status RLS final
SELECT 
  schemaname, 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('profiles', 'empresas', 'conversations', 'messages', 'products', 'orders', 'whatsapp_sessions', 'notifications', 'calendar_events', 'clientes_empresas')
ORDER BY tablename;

-- Políticas ativas
SELECT 
  schemaname, 
  tablename, 
  policyname, 
  cmd 
FROM pg_policies 
WHERE schemaname = 'public' 
ORDER BY tablename, policyname;

-- Índices criados (verifique se existem)
SELECT indexname, tablename FROM pg_indexes WHERE schemaname = 'public' AND indexname LIKE 'idx_%';