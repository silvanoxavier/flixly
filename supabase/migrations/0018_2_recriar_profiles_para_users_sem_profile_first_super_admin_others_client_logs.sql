INSERT INTO public.profiles (id, first_name, phone, role)
SELECT 
  u.id, 
  COALESCE(u.raw_user_meta_data->>'first_name', 'Usuário'),
  COALESCE(u.raw_user_meta_data->>'phone', ''),
  CASE 
    WHEN NOT EXISTS (SELECT 1 FROM auth.users WHERE id != u.id) THEN 'super_admin'
    ELSE 'client'
  END as role
FROM auth.users u
WHERE NOT EXISTS (SELECT 1 FROM public.profiles p WHERE p.id = u.id)
ON CONFLICT (id) DO NOTHING;