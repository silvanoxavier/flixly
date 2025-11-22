-- Esta query roda com privilégios do serviço (visível para super_admin)
SELECT 
  id,
  email,
  confirmed_at,
  created_at,
  raw_user_meta_data
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 5;