SELECT 
  u.id, u.email, p.first_name, p.role,
  CASE WHEN ce.id IS NULL THEN 'SEM EMPRESA' ELSE 'OK' END as status
FROM auth.users u
JOIN public.profiles p ON p.id = u.id
LEFT JOIN public.clientes_empresas ce ON ce.user_id = u.id
WHERE u.confirmed_at IS NOT NULL
ORDER BY u.created_at DESC;