"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const messages = [
  { id: 1, text: "Olá! Tudo bem?", sender: "user", time: "14:25" },
  { id: 2, text: "Sim, e contigo?", sender: "me", time: "14:26" },
  { id: 3, text: "Tudo ótimo! Como posso ajudar hoje?", sender: "user", time: "14:27" },
];

export default function ChatWindow() {
  return (
    <div className="flex-1 overflow-auto p-4 space-y-4 bg-background/50">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === "me" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted rounded-br-none"}`}>
            <p>{msg.text}</p>
            <p className={`text-xs mt-1 ${msg.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              {format(new Date(`2023-01-01 ${msg.time}`), "HH:mm", { locale: ptBR })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}