DROP TABLE IF EXISTS public.calendar_events CASCADE;
CREATE TABLE public.calendar_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.empresas(id) ON DELETE CASCADE,
  resource_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  start TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE IF EXISTS public.calendar_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Company can manage own events" ON public.calendar_events;
CREATE POLICY "Company can manage own events" ON public.calendar_events 
FOR ALL TO authenticated USING ((auth.jwt() ->> 'company_id')::uuid = company_id);