-- Índices otimizados (removido CONCURRENTLY para Supabase SQL Editor)
DROP INDEX IF EXISTS idx_messages_company_read;
CREATE INDEX IF NOT EXISTS idx_messages_conversation_read ON public.messages (conversation_id, read_at) WHERE read_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_messages_conversation_created ON public.messages (conversation_id, created_at DESC);

-- Manter outros índices úteis
CREATE INDEX IF NOT EXISTS idx_conversations_company_updated ON public.conversations (company_id, updated_at DESC) WHERE last_message_at IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_clientes_empresas_user_empresa ON public.clientes_empresas (user_id, empresa_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_read ON public.notifications (user_id, read_at) WHERE read_at IS NULL;