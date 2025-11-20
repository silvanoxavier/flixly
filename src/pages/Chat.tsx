"use client";

import React, { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  text: string;
  sender: "me" | "other";
  time: Date;
}

interface ContextType {
  company: { id: string; name: string; instance: string };
}

const Chat = () => {
  const { company } = useOutletContext<ContextType>();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Como posso ajudar você hoje?",
      sender: "other",
      time: new Date(Date.now() - 120000),
    },
    {
      id: "2",
      text: "Oi, tudo bem? Quero saber sobre o produto X.",
      sender: "me",
      time: new Date(Date.now() - 60000),
    },
    {
      id: "3",
      text: "Claro! O produto X está disponível por R$ 99,90.",
      sender: "other",
      time: new Date(Date.now() - 30000),
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const id = Date.now().toString();
    const msg: Message = {
      id,
      text: input,
      sender: "me" as const,
      time: new Date(),
    };
    setMessages((prev) => [...prev, msg]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto">
      <Card className="flex-1 flex flex-col shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center justify-between">
            Chat - {company?.name || "Cliente"}
            <div className="text-sm text-muted-foreground">
              Instância: {company?.instance || "inst1"}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 flex-1 flex flex-col">
          <ScrollArea className="flex-1 h-[calc(100vh-300px)] p-6 pr-2">
            <div className="space-y-4 mb-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.sender === "me" ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "group flex flex-col max-w-xs lg:max-w-md p-4 rounded-2xl shadow",
                      msg.sender === "me"
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted rounded-bl-sm"
                    )}
                  >
                    <div className="flex items-start space-x-2 mb-1">
                      {msg.sender === "other" && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarImage src="/placeholder.svg" />
                          <AvatarFallback className="text-xs">C</AvatarFallback>
                        </Avatar>
                      )}
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                    <p
                      className={cn(
                        "text-xs opacity-75 self-end",
                        msg.sender === "me" ? "text-primary-foreground/80" : ""
                      )}
                    >
                      {msg.time.toLocaleTimeString("pt-BR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={scrollRef} />
            </div>
          </ScrollArea>
          <div className="p-4 border-t bg-background">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Digite sua mensagem..."
                className="flex-1 min-h-[44px] resize-none"
              />
              <Button onClick={sendMessage} size="icon" className="h-12 w-12 shrink-0">
                →
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Chat;