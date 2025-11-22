-- 1. Corrected DROP order to make idempotent
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update_policy" ON public.profiles;
DROP POLICY IF EXISTS "profiles_delete_policy" ON public.profiles;

-- 2. Recreate RLS policies (users own + super_admin all)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select_policy" ON public.profiles 
FOR SELECT TO authenticated USING ((auth.uid() = id) OR EXISTS(SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'super_admin'));

CREATE POLICY "profiles_insert_policy" ON public.profiles 
FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles_update_policy" ON public.profiles 
FOR UPDATE TO authenticated USING ((auth.uid() = id) OR EXISTS(SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'super_admin'));

CREATE POLICY "profiles_delete_policy" ON public.profiles 
FOR DELETE TO authenticated USING (EXISTS(SELECT 1 FROM public.profiles p WHERE p.id = auth.uid() AND p.role = 'super_admin'));

-- 3. FIXED function: correct first-user detection (exclude new.id) and remove last_name
-- Added RAISE NOTICE for debugging
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER SET search_path = ''
AS $$
DECLARE
  _first_name TEXT;
  _phone TEXT;
  _role TEXT;
BEGIN
  _first_name := COALESCE(new.raw_user_meta_data ->> 'first_name', '');
  _phone := COALESCE(new.raw_user_meta_data ->> 'phone', '');

  RAISE NOTICE 'handle_new_user triggered for user_id: %, first_name: %, phone: %', new.id, _first_name, _phone;

  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id != new.id) THEN
    -- FIRST user ever: super_admin
    _role := 'super_admin';
  ELSE
    -- Subsequent users: client
    _role := 'client';
  END IF;

  INSERT INTO public.profiles (id, first_name, phone, role)
  VALUES (
    new.id, 
    _first_name,
    _phone,
    _role
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN new;
END;
$$;

-- 4. Recreate trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure 'phone' column in 'profiles' is TEXT
ALTER TABLE public.profiles ALTER COLUMN phone TYPE TEXT;