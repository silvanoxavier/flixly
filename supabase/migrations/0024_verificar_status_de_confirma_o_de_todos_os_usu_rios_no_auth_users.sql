SELECT 
  id,
  email, 
  email_confirmed_at,
  created_at,
  last_sign_in_at,
  confirmed_at
FROM auth.users 
ORDER BY created_at DESC 
LIMIT 10;