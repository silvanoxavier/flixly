CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  -- Check if this is the very first user being created
  IF NOT EXISTS (SELECT 1 FROM auth.users) THEN
    INSERT INTO public.profiles (id, first_name, phone, role)
    VALUES (
      new.id,
      new.raw_user_meta_data ->> 'first_name',
      new.raw_user_meta_data ->> 'phone',
      'super_admin'
    )
    ON CONFLICT (id) DO NOTHING;
  ELSE
    INSERT INTO public.profiles (id, first_name, phone, role)
    VALUES (
      new.id,
      new.raw_user_meta_data ->> 'first_name',
      new.raw_user_meta_data ->> 'phone',
      'client'
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;
  RETURN new;
END;
$$;

-- O trigger on_auth_user_created já existe e não precisa ser recriado,
-- pois a função que ele chama foi atualizada.