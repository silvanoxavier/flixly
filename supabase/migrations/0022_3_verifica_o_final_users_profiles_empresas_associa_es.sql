SELECT 
  'Users confirmados:' as metric, COUNT(u.id)::text as count FROM auth.users u WHERE confirmed_at IS NOT NULL
UNION ALL
SELECT 'Profiles:', COUNT(p.id)::text FROM public.profiles p
UNION ALL
SELECT 'Empresas:', COUNT(e.id)::text FROM public.empresas e
UNION ALL
SELECT 'Associações:', COUNT(ce.id)::text FROM public.clientes_empresas ce;