export interface Message {
  id: string;
  text: string;
  sender_type: 'human' | 'bot';
  created_at: string;
  time: Date;
  read_at?: string;
  conversation_id: string;
  company_id: string;
}