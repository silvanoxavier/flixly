"use client";

import { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Phone, Video, MoreVertical, MessageCircle, User } from "lucide-react";
import ChatList from "../components/ChatList";
import ChatWindow from "../components/ChatWindow";
import MessageComposer from "../components/MessageComposer";
import { evolutionApi } from '@/lib/evolution';
import { Skeleton } from "@/components/ui/skeleton";

interface CompanyContext {
  company: { id: string; nome_fantasia: string };
}

interface Conversation {
  id: string;
  customer_name: string;
  customer_phone: string;
}

interface Instance {
  instance_name: string;
}

export default function WhatsApp() {
  const { company } = useOutletContext<CompanyContext>();
  const queryClient = useQueryClient();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

  const { data: activeInstance } = useQuery<Instance | null>({
    queryKey: ['active-instance', company.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('whatsapp_sessions')
        .select('instance_name')
        .eq('company_id', company.id)
        .eq('status', 'connected')
        .single();
      return data || null;
    },
    enabled: !!company.id,
  });

  // Realtime messages channel for company
  useEffect(() => {
    if (!company.id) return;

    const channel = supabase.channel(`company-messages:${company.id}`);
    channel
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `company_id=eq.${company.id}` },
        () => {
          queryClient.invalidateQueries({ queryKey: ['conversations', company.id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [company.id, queryClient]);

  const handleSend = useCallback(async (text: string) => {
    if (!selectedConversation || !activeInstance) return;

    try {
      await evolutionApi.sendText(
        activeInstance.instance_name,
        selectedConversation.customer_phone,
        text,
        company.id,
        selectedConversation.id
      );
    } catch (error) {
      console.error('Send failed:', error);
    }
  }, [selectedConversation, activeInstance, company.id]);

  if (!company.id || !activeInstance) {
    return <Skeleton className="h-full" />;
  }

  return (
    <div className="flex h-full md:flex-row flex-col">
      <div className="w-full md:w-80 border-r bg-card flex-shrink-0 flex flex-col">
        <ChatList 
          companyId={company.id} 
          onSelectChat={setSelectedConversation} 
        />
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {selectedConversation ? (
          <>
            <div className="border-b bg-card/80 backdrop-blur p-4 flex items-center justify-between sticky top-0 z-10">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{selectedConversation.customer_name}</h3>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon"><Phone className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon"><Video className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
              </div>
            </div>
            <ChatWindow 
              conversationId={selectedConversation.id} 
              companyId={company.id} 
            />
            <MessageComposer onSend={handleSend} />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <MessageCircle className="h-12 w-12 mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Selecione uma conversa</h3>
              <p>Escolha uma conversa para começar</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}