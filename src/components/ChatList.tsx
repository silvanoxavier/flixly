"use client";

import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface ChatListProps {
  companyId: string;
  onSelectChat: (chat: { id: string; customer_name: string; customer_phone: string; last_message: string; unread_count: number; updated_at: string; avatar?: string }) => void;
}

interface Conversation {
  id: string;
  customer_name: string;
  customer_phone: string;
  last_message: string;
  unread_count: number;
  updated_at: string;
  avatar?: string;
}

export default function ChatList({ companyId, onSelectChat }: ChatListProps) {
  const { data: chats = [] } = useQuery<Conversation[]>({
    queryKey: ['conversations', companyId],
    queryFn: async () => {
      const { data } = await supabase
        .from('conversations')
        .select('id, customer_name, customer_phone, last_message, unread_count, updated_at')
        .eq('company_id', companyId)
        .order('updated_at', { ascending: false });
      return data || [];
    },
    enabled: !!companyId,
  });

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b font-semibold text-foreground">Conversas</div>
      <div className="flex-1 overflow-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="p-4 hover:bg-accent cursor-pointer border-b border-transparent hover:border-muted flex items-center space-x-3"
            onClick={() => onSelectChat(chat)}
          >
            <Avatar className="h-12 w-12">
              <AvatarImage src={chat.avatar} />
              <AvatarFallback className="bg-primary text-primary-foreground text-sm font-medium">
                {chat.customer_name.slice(0,2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div className="truncate font-medium text-foreground">{chat.customer_name}</div>
                <div className="text-xs text-muted-foreground ml-2">
                  {new Date(chat.updated_at).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-sm text-muted-foreground truncate max-w-[200px]">{chat.last_message}</p>
                {chat.unread_count > 0 && <Badge className="text-xs ml-auto">{chat.unread_count}</Badge>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}