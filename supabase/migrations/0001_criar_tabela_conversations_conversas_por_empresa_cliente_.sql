CREATE TABLE public.conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  customer_id UUID NOT NULL REFERENCES public.customers(id) ON DELETE CASCADE,
  last_message_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Company can view own conversations" ON public.conversations 
FOR SELECT TO authenticated USING ((auth.jwt() ->> 'company_id')::uuid = company_id);

CREATE POLICY "Company can insert own conversations" ON public.conversations 
FOR INSERT TO authenticated WITH CHECK ((auth.jwt() ->> 'company_id')::uuid = company_id);

CREATE POLICY "Company can update own conversations" ON public.conversations 
FOR UPDATE TO authenticated USING ((auth.jwt() ->> 'company_id')::uuid = company_id);