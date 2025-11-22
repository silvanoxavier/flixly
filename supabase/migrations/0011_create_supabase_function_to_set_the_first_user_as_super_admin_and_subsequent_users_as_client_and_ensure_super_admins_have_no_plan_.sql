CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Check if this is the very first user being created
  IF NOT EXISTS (SELECT 1 FROM auth.users) THEN
    INSERT INTO public.profiles (id, role)
    VALUES (new.id, 'super_admin')
    ON CONFLICT (id) DO NOTHING;
  ELSE
    INSERT INTO public.profiles (id, role)
    VALUES (new.id, 'client')
    ON CONFLICT (id) DO NOTHING;
  END IF;
  RETURN new;
END;
$$;

-- Drop the existing trigger if it exists to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Trigger the function on user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Update RLS policy for profiles to allow super_admin to view all profiles
-- and users to view their own profile.
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
CREATE POLICY "profiles_select_policy" ON public.profiles
FOR SELECT TO authenticated USING (
  (auth.uid() = id) OR (role = 'super_admin')
);

-- Update RLS policy for profiles to allow super_admin to update all profiles
-- and users to update their own profile.
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;
CREATE POLICY "profiles_update_policy" ON public.profiles
FOR UPDATE TO authenticated USING (
  (auth.uid() = id) OR (role = 'super_admin')
);

-- Update RLS policy for profiles to allow super_admin to delete all profiles.
DROP POLICY IF EXISTS "profiles_delete_policy" ON public.profiles;
CREATE POLICY "profiles_delete_policy" ON public.profiles
FOR DELETE TO authenticated USING (
  role = 'super_admin'
);

-- Ensure super_admin can manage all companies
DROP POLICY IF EXISTS "Super admins podem gerenciar todas as associações" ON public.clientes_empresas;
CREATE POLICY "Super admins podem gerenciar todas as associações" ON public.clientes_empresas
FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin')
) WITH CHECK (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin')
);

-- Ensure super_admin can delete companies
DROP POLICY IF EXISTS "Super admins podem deletar empresas" ON public.empresas;
CREATE POLICY "Super admins podem deletar empresas" ON public.empresas
FOR DELETE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'super_admin')
);