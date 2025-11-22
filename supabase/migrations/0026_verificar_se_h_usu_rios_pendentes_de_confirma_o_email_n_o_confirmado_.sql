SELECT 
  id,
  email,
  created_at
FROM auth.users 
WHERE email_confirmed_at IS NULL
ORDER BY created_at DESC;