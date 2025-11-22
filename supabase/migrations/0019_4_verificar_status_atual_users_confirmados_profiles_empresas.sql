-- Users confirmados
SELECT 'Users confirmados:' as status, COUNT(*) as total FROM auth.users WHERE confirmed_at IS NOT NULL;

-- Profiles criados
SELECT 'Profiles criados:' as status, COUNT(*) as total FROM public.profiles;

-- Empresas existentes
SELECT 'Empresas criadas:' as status, COUNT(*) as total FROM public.empresas;

-- Associações user-empresa
SELECT 'Associações user-empresa:' as status, COUNT(*) as total FROM public.clientes_empresas;