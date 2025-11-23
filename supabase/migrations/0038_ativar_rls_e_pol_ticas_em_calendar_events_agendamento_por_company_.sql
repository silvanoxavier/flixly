ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Company can manage own events" ON public.calendar_events;
CREATE POLICY "Users manage own company calendar events" ON public.calendar_events FOR ALL TO authenticated USING (public.user_owns_company(company_id)) WITH CHECK (public.user_owns_company(company_id));