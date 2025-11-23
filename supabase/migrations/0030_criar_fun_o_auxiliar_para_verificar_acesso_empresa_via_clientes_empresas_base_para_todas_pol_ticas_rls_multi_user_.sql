CREATE OR REPLACE FUNCTION public.user_owns_company(p_company_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.clientes_empresas 
    WHERE user_id = auth.uid() AND empresa_id = p_company_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;