"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'user';
  time: Date;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const id = Date.now().toString();
    const msg: Message = {
      id,
      text: inputText.trim(),
      sender: 'me',
      time: new Date(),
    };
    setMessages(prev => [...prev, msg]);
    setInputText('');

    // Simula resposta
    setTimeout(() => {
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Mensagem recebida! Como posso ajudar?',
        sender: 'user',
        time: new Date(),
      };
      setMessages(prev => [...prev, reply]);
    }, 1000);
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <div className="p-6 border-b font-bold text-2xl">Chat</div>
      <div className="flex-1 overflow-auto p-6 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-md px-4 py-2 rounded-2xl ${
              msg.sender === 'me' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
            }`}>
              <p>{msg.text}</p>
              <p className="text-xs mt-1 opacity-75 text-right">
                {msg.time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
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