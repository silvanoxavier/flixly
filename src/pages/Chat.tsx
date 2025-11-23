"use client";

import { useState, useEffect, useRef } from 'react';
import { useCompany } from '@/providers/CompanyProvider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { evolutionApi } from '~/lib/evolution';
import { Message } from '~/types/message';
import { Skeleton } from "@/components/ui/skeleton";

export default function Chat() {
  const { selectedCompany: company } = useCompany();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  // Realtime company-wide messages
  useEffect(() => {
    if (!company?.id) return;

    const channel = supabase.channel(`chat-messages:${company.id}`);
    channel
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'messages', filter: `company_id=eq.${company.id}` },
        () => queryClient.invalidateQueries({ queryKey: ['company-messages', company.id] })
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [company?.id, queryClient]);

  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ['company-messages', company?.id],
    queryFn: async () => {
      if (!company?.id) return [];
      const { data } = await supabase
        .from('messages')
        .select('*')
        .eq('company_id', company.id)
        .order('created_at', { ascending: true });
      return (data || []).map(msg => ({ 
        ...msg, 
        time: new Date(msg.created_at) // Fix TS2741: sempre converte created_at → time: Date
      }));
    },
    enabled: !!company?.id,
  });

  const sendMessage = async () => {
    if (!inputText.trim() || !company?.id) return;

    const msg: Omit<Message, 'id' | 'read_at'> = {
      text: inputText.trim(),
      sender_type: 'bot',
      created_at: new Date().toISOString(),
      time: new Date(), // Fix TS2741
      conversation_id: 'demo-conv',
      company_id: company.id,
    };

    try {
      // Sync imediato para UI realtime (otimista)
      await supabase.from('messages').insert(msg);
      
      // Envia via Evolution (demo)
      await evolutionApi.sendText('demo-instance', '5511999999999', inputText.trim(), company.id!, 'demo-conv');
      
      toast.success('Mensagem enviada!');
      setInputText('');
    } catch (error) {
      toast.error('Erro ao enviar');
    }
  };

  if (!company) {
    return <Skeleton className="h-full w-full" />;
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="p-6 border-b font-bold text-2xl flex items-center gap-2">
        <MessageCircle className="h-7 w-7" />
        Chat Demo - {company.nome_fantasia}
      </div>
      <div className="flex-1 overflow-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender_type === 'bot' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md px-4 py-2 rounded-2xl ${
              msg.sender_type === 'bot' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted rounded-br-none'
            }`}>
              <p>{msg.text}</p>
              <p className="text-xs mt-1 opacity-75">{msg.time.toLocaleTimeString('pt-BR')}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4 bg-card flex items-center space-x-2">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Digite uma mensagem..."
          className="flex-1"
        />
        <Button onClick={sendMessage} disabled={!inputText.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}