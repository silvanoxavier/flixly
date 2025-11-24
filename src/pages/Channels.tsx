"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Facebook, Instagram, Youtube } from "lucide-react";
import CreateInstanceModal from "@/modules/channels/evolution/CreateInstanceModal"; // Corrigido o alias para @
import ManageInstanceModal from "@/modules/channels/evolution/ManageInstanceModal"; // Corrigido o alias para @

export default function Channels() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <MessageCircle className="h-7 w-7 text-primary" />
          Canais
        </h1>
        <p className="text-muted-foreground">Gerencie seus canais de comunicação.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageCircle className="h-6 w-6 text-green-500" />
              WhatsApp
            </CardTitle>
            <Badge variant="outline">Evolution API</Badge>
          </CardHeader>
          <CardContent className="pt-0">
            <CreateInstanceModal />
            <ManageInstanceModal />
          </CardContent>
        </Card>
        {/* Outros canais em breve */}
        <Card className="flex flex-col items-center justify-center text-center p-8">
          <MessageCircle className="h-12 w-12 text-blue-500 mb-4" />
          <h3 className="font-semibold mb-2">Messenger</h3>
          <Badge variant="secondary">Em breve</Badge>
        </Card>
        <Card className="flex flex-col items-center justify-center text-center p-8">
          <Instagram className="h-12 w-12 text-pink-500 mb-4" />
          <h3 className="font-semibold mb-2">Instagram DM</h3>
          <Badge variant="secondary">Em breve</Badge>
        </Card>
        <Card className="flex flex-col items-center justify-center text-center p-8">
          <Youtube className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="font-semibold mb-2">YouTube Comments</h3>
          <Badge variant="secondary">Em breve</Badge>
        </Card>
        <Card className="flex flex-col items-center justify-center text-center p-8">
          <Facebook className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="font-semibold mb-2">Facebook Comments</h3>
          <Badge variant="secondary">Em breve</Badge>
        </Card>
      </div>
    </div>
  );
}