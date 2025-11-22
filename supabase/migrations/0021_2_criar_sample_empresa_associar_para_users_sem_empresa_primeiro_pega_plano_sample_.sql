-- Pega ou cria plano sample
INSERT INTO public.plans (id, name, price, description, features, active) 
VALUES (gen_random_uuid(), 'Básico', 29.90, 'Plano inicial', '["WhatsApp","Chat"]'::jsonb, true)
ON CONFLICT DO NOTHING;

-- Para cada user sem empresa, cria empresa sample + associa
INSERT INTO public.empresas (id, nome_fantasia, cnpj, razao_social, plano_id)
SELECT 
  gen_random_uuid(),
  'Empresa ' || p.first_name || ' Ltda',
  '12.345.678/0001-' || LPAD((ROW_NUMBER() OVER())::text, 2, '0'),
  'Empresa ' || p.first_name || ' Ltda',
  (SELECT id FROM public.plans WHERE name = 'Básico' LIMIT 1)
FROM public.profiles p
WHERE NOT EXISTS (
  SELECT 1 FROM public.clientes_empresas ce 
  JOIN public.empresas e ON e.id = ce.empresa_id 
  WHERE ce.user_id = p.id
);

-- Associa user à nova empresa
INSERT INTO public.clientes_empresas (user_id, empresa_id)
SELECT 
  p.id,
  e.id
FROM public.profiles p
JOIN public.empresas e ON e.razao_social LIKE '%' || p.first_name || '%'
LEFT JOIN public.clientes_empresas ce ON ce.user_id = p.id
WHERE ce.id IS NULL;