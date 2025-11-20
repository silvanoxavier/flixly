"use client";

import { useState, useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Send, Check, CheckCheck, Paperclip, Mic, Image, FileText as FileIcon, Clock, io } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { evolutionApi } from "~/lib/evolution";
import ioClient from "socket.io-client";

interface Message {
  id: string;
  text?: string;
  type: 'text' | 'image' | 'audio' | 'pdf';
  sender: 'me' | 'customer';
  status: 'sending' | 'sent' | 'delivered' | 'read';
  time: Date;
  fileUrl?: string;
}

interface Conversation {
  id: string;
  customerName: string;
  customerAvatar: string;
  lastMessage: string;
  unread: number;
  time: Date;
}

const conversations: Conversation[] = [
  { id: "1", customerName: "João Silva", customerAvatar: "/placeholder.svg", lastMessage: "Olá, bom dia!", unread: 2, time: new Date() },
  { id: "2", customerName: "Maria Santos", customerAvatar: "/placeholder.svg", lastMessage: "Pedido #123", unread: 0, time: new Date(Date.now() - 3600000) },
];

const Chat = () => {
  const { company } = useOutletContext() as any;
  const [selectedConv, setSelectedConv] = useState(conversations[0]);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Olá! Como posso ajudar?", type: 'text', sender: 'customer', status: 'read' as const, time: new Date() },
    { id: "2", text: "Bom dia, tenho uma dúvida sobre o produto.", type: 'text', sender: 'me', status: 'read' as const, time: new Date(Date.now() - 60000) },
    { id: "3", type: 'image', sender: 'customer', status: 'read' as const, time: new Date(Date.now() - 120000), fileUrl: "/placeholder.svg" },
  ]);
  const [input, setInput] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    // Mock Socket.IO realtime (substitua por Convex subscription ou real WS)
    socketRef.current = ioClient("ws://localhost:8080"); // Ajuste URL real
    socketRef.current.on("newMessage", (msg: Message) => {
      setMessages(prev => [...prev, { ...msg, id: Date.now().toString() }]);
    });

    // Simulate incoming message
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: "Nova mensagem recebida!",
          type: 'text',
          sender: 'customer',
          status: 'delivered',
          time: new Date(),
        }]);
      }
    }, 10000);

    return () => {
      socketRef.current?.disconnect();
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() && !file) return;

    const msg: Message = {
      id: Date.now().toString(),
      ...(file ? { type: file.type.startsWith('image/') ? 'image' : file.type.includes('audio') ? 'audio' : 'pdf' as any, fileUrl: URL.createObjectURL(file) } : { text: input, type: 'text' }),
      sender: 'me',
      status: 'sending',
      time: new Date(),
    };

    setMessages(prev => [...prev, msg]);
    setInput("");
    setFile(null);

    // Simulate status update
    setTimeout(() => setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: 'sent' } : m)), 1000);
    setTimeout(() => setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: 'delivered' } : m)), 2000);
    setTimeout(() => setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, status: 'read' } : m)), 3000);

    // Real send via Evolution (se envs set)
    if (import.meta.env.VITE_EVOLUTION_TOKEN) {
      try {
        await evolutionApi.sendMessage(company.instance, selectedConv.id, { message: input });
      } catch (e) {
        console.error("Erro envio:", e);
      }
    }
  };

  const statusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending': return <Clock className="h-4 w-4" />;
      case 'sent': return <Check className="h-4 w-4" />;
      case 'delivered': return <Check className="h-4 w-4" />;
      case 'read': return <CheckCheck className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex h-full space-x-4">
      {/* Sidebar conversas */}
      <Card className="w-80 flex-shrink-0">
        <CardHeader>
          <CardTitle>Conversas</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[calc(100vh-200px)]">
            {conversations.map(conv => (
              <Button
                key={conv.id}
                variant={selectedConv.id === conv.id ? "secondary" : "ghost"}
                className="w-full justify-start p-4 h-auto text-left"
                onClick={() => setSelectedConv(conv)}
              >
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={conv.customerAvatar} />
                  <AvatarFallback>{conv.customerName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <div className="font-medium">{conv.customerName}</div>
                  <div className="text-sm text-muted-foreground line-clamp-1">{conv.lastMessage}</div>
                  {conv.unread > 0 && <Badge className="ml-auto">{conv.unread}</Badge>}
                </div>
              </Button>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        <Card className="flex-1 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={selectedConv.customerAvatar} />
                <AvatarFallback>{selectedConv.customerName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{selectedConv.customerName}</div>
                <div className="text-sm text-muted-foreground">Online</div>
              </div>
            </div>
          </CardHeader>
          <Separator />
          <ScrollArea ref={scrollRef} className="flex-1 p-4">
            {messages.map(msg => (
              <div key={msg.id} className={cn("flex mb-4", msg.sender === 'me' ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-xs lg:max-w-md p-3 rounded-2xl", msg.sender === 'me' ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-muted")}>
                  {msg.type === 'text' && <p>{msg.text}</p>}
                  {msg.type === 'image' && <img src={msg.fileUrl} alt="Imagem" className="max-w-full rounded-lg" />}
                  {msg.type === 'audio' && <audio controls className="w-full"><source src={msg.fileUrl} /></audio>}
                  {msg.type === 'pdf' && <iframe src={msg.fileUrl} className="w-full h-48" />}
                  <div className="flex items-center justify-end mt-1 text-xs text-muted-foreground">
                    {msg.time.toLocaleTimeString()}
                    {msg.sender === 'me' && statusIcon(msg.status)}
                  </div>
                </div>
              </div>
            ))}
          </ScrollArea>
          <Separator />
          <div className="p-4 space-y-2">
            <div className="flex space-x-2">
              <Input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="flex-1"
                accept="image/*,audio/*,application/pdf"
              />
              <Button type="button" variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex space-x-2">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 min-h-[44px] resize-none"
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
              />
              <Button onClick={sendMessage} disabled={!input.trim() && !file}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;