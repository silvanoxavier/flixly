"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { evolutionApi } from '@/lib/evolution';

interface CompanyContext {
  company: { id: string };
}

const Chat: React.FC = () => {
  const { company } = useOutletContext<CompanyContext>();
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  // Realtime demo messages (company-wide)
  useEffect(() => {
    if (!company.id) return;

    const channel = supabase.channel(`chat-demo:${company.id}`);
    channel
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'messages', filter: `company_id=eq.${company.id}` },
        () => queryClient.invalidateQueries({ queryKey: ['demo-messages'] })
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [company.id, queryClient]);

  const sendMessage = async () => {
    if (!inputText.trim() || !company.id) return;

    try {
      // Demo: send to first conversation or mock
      await evolutionApi.sendText('demo-instance', '5511999999999', inputText.trim(), company.id);
      toast.success('Mensagem enviada!');
      setInputText('');
    } catch (error) {
      toast.error('Erro ao enviar');
    }
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="p-6 border-b font-bold text-2xl">Chat Demo</div>
      <div className="flex-1 overflow-auto p-6 space-y-4">
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4 bg-card">
        <div className="flex space-x-2">
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
    </div>
  );
};

export default Chat;