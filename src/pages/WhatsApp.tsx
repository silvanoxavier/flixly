"use client";

import { useState, useCallback } from "react";
import { useCompany } from "@/providers/CompanyProvider";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import MessageComposer from "../components/MessageComposer";
import { evolutionApi } from '@/lib/evolution';
import { Skeleton } from "@/components/ui/skeleton";

interface Conversation {
  id: string;
  customer_name: string;
  customer_phone: string;
  last_message: string;
  unread_count: number;
  updated_at: string;
  avatar?: string;
}

interface Instance {
  id: string;
  instance_name: string;
  status: string;
}

export default function WhatsApp() {
  const { selectedCompany: company } = useCompany();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);

  const { data: instances = [] } = useQuery<Instance[]>({
    queryKey: ['whatsapp_instances', company?.id],
    queryFn: async () => {
      if (!company?.id) return [];
      const { data } = await supabase
        .from('whatsapp_sessions')
        .select('*')
        .eq('company_id', company.id);
      return data || [];
    },
    enabled: !!company?.id,
  });

  const activeInstance = instances.find(i => i.status === 'connected') || instances[0];

  const handleSelectChat = useCallback((chat: Conversation) => {
    setSelectedConversationId(chat.id);
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!activeInstance || !selectedConversationId || !company?.id) return;
    try {
      await evolutionApi.sendText(
        activeInstance.instance_name,
        '5511999999999', // Demo phone
        text,
        company.id,
        selectedConversationId
      );
    } catch (error) {
      console.error('Send error:', error);
    }
  }, [activeInstance, selectedConversationId, company?.id]);

  if (!company) {
    return <Skeleton className="h-full w-full" />;
  }

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="p-6 border-b flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full" />
          <span className="font-semibold">{activeInstance ? activeInstance.instance_name : 'Sem instância'}</span>
        </div>
      </div>
      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 border-r flex-shrink-0 hidden lg:flex">
          <ChatList companyId={company.id} onSelectChat={handleSelectChat} />
        </div>
        <div className="flex-1 flex flex-col">
          {selectedConversationId ? (
            <ChatWindow conversationId={selectedConversationId} companyId={company.id} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              Selecione uma conversa
            </div>
          )}
          <MessageComposer onSend={handleSendMessage} disabled={!activeInstance || !selectedConversationId} />
        </div>
      </div>
    </div>
  );
}