"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, MessageCircle } from "lucide-react";

export default function Messages() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Mensagens</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Chat Preview</CardTitle>
          </CardHeader>
          <CardContent className="h-[600px] flex flex-col">
            <div className="flex-1 p-4 space-y-4 overflow-auto">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="bg-muted p-3 rounded-lg max-w-xs">
                  <p>Olá! Como posso ajudar?</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex gap-2">
              <Input placeholder="Digite sua mensagem..." />
              <Button size="icon" className="h-10 w-10">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Conversas Recentes</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="p-3 hover:bg-muted rounded cursor-pointer">João Silva</div>
            <div className="p-3 hover:bg-muted rounded cursor-pointer">Maria Santos</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}