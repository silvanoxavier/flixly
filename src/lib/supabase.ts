import { createClient } from '@supabase/supabase-js'

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

if (!supabaseUrl) {
  console.error('Erro: VITE_SUPABASE_URL não está definido. Verifique seu arquivo .env.local.');
  throw new Error('VITE_SUPABASE_URL is required. Check .env.local');
}
if (!supabaseAnonKey) {
  console.error('Erro: VITE_SUPABASE_ANON_KEY não está definido. Verifique seu arquivo .env.local.');
  throw new Error('VITE_SUPABASE_ANON_KEY is required. Check .env.local');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)