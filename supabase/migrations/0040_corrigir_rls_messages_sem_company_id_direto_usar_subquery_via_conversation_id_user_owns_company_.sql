-- Corrigir políticas MESSAGES (join virtual via conversations.company_id)
DROP POLICY IF EXISTS "Users view own company messages realtime" ON public.messages;
DROP POLICY IF EXISTS "Users insert own company messages realtime" ON public.messages;
DROP POLICY IF EXISTS "Users update own company messages" ON public.messages;

CREATE POLICY "Users view messages in own company conversations" ON public.messages
FOR SELECT TO authenticated 
USING (EXISTS (
  SELECT 1 FROM public.conversations 
  WHERE conversations.id = messages.conversation_id 
  AND public.user_owns_company(conversations.company_id)
));

CREATE POLICY "Users insert messages in own company conversations" ON public.messages
FOR INSERT TO authenticated 
WITH CHECK (EXISTS (
  SELECT 1 FROM public.conversations 
  WHERE conversations.id = messages.conversation_id 
  AND public.user_owns_company(conversations.company_id)
));

CREATE POLICY "Users update messages in own company conversations" ON public.messages
FOR UPDATE TO authenticated 
USING (EXISTS (
  SELECT 1 FROM public.conversations 
  WHERE conversations.id = messages.conversation_id 
  AND public.user_owns_company(conversations.company_id)
));