"use client";

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect } from 'react';
import { Message } from '@/types/message';

interface ChatWindowProps {
  conversationId: string;
  companyId: string;
}

export default function ChatWindow({ conversationId, companyId }: ChatWindowProps) {
  const queryClient = useQueryClient();

  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ['messages', conversationId],
    queryFn: async () => {
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true });
      return (data || []).map(msg => ({ ...msg, time: new Date(msg.created_at) }));
    },
    enabled: !!conversationId,
  });

  useEffect(() => {
    if (!conversationId || !companyId) return;

    const channel = supabase.channel(`messages:${conversationId}`);
    channel
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'messages', filter: `conversation_id=eq.${conversationId}` },
        () => queryClient.invalidateQueries({ queryKey: ['messages', conversationId] })
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, companyId, queryClient]);

  return (
    <div className="flex-1 overflow-auto p-4 space-y-4 bg-background/50">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.sender_type === 'bot' ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
            msg.sender_type === 'bot' 
              ? "bg-primary text-primary-foreground ml-auto" 
              : "bg-muted rounded-br-none"
          }`}>
            <p>{msg.text}</p>
            <p className={`text-xs mt-1 ${
              msg.sender_type === 'bot' 
                ? "text-primary-foreground/70" 
                : "text-muted-foreground"
            }`}>
              {format(msg.time, "HH:mm", { locale: ptBR })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}