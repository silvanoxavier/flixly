SELECT 
  p.id,
  p.first_name,
  p.phone,
  p.role,
  p.updated_at,
  u.email,
  u.email_confirmed_at
FROM public.profiles p
JOIN auth.users u ON p.id = u.id
ORDER BY p.updated_at DESC;