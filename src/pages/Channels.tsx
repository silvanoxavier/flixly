"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Facebook, Instagram, Youtube, Globe } from "lucide-react";
import CreateInstanceModal from "../modules/channels/evolution/CreateInstanceModal";
import ManageInstanceModal from "../modules/channels/evolution/ManageInstanceModal";

export default function Channels() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Canais</h1>
        <p className="text-muted-foreground">Gerencie seus canais de comunicação multi-plataforma.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {/* WhatsApp */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageCircle className="h-6 w-6 text-green-500" />
              WhatsApp
            </CardTitle>
            <Badge variant="outline">Evolution API</Badge>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2">
              <CreateInstanceModal />
              <ManageInstanceModal />
            </div>
          </CardContent>
        </Card>

        {/* Messenger */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-lg">
              <MessageCircle className="h-8 w-8 text-blue-500" />
              Messenger
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center text-center space-y-3">
            <Badge variant="secondary" className="text-lg px-4 py-2">Em breve</Badge>
            <p className="text-sm text-muted-foreground max-w-[150px]">
              Facebook Messenger
            </p>
          </CardContent>
        </Card>

        {/* Instagram Direct */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-lg">
              <Instagram className="h-8 w-8 text-pink-500" />
              Instagram Direct
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center text-center space-y-3">
            <Badge variant="secondary" className="text-lg px-4 py-2">Em breve</Badge>
            <p className="text-sm text-muted-foreground max-w-[150px]">DMs do Instagram</p>
          </CardContent>
        </Card>

        {/* YouTube Comments */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-lg">
              <Youtube className="h-8 w-8 text-red-500" />
              YouTube Comments
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center text-center space-y-3">
            <Badge variant="secondary" className="text-lg px-4 py-2">Em breve</Badge>
            <p className="text-sm text-muted-foreground max-w-[150px]">Comentários</p>
          </CardContent>
        </Card>

        {/* Facebook Comments */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center justify-center gap-2 text-lg">
              <Facebook className="h-8 w-8 text-blue-600" />
              Facebook Comments
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center text-center space-y-3">
            <Badge variant="secondary" className="text-lg px-4 py-2">Em breve</Badge>
            <p className="text-sm text-muted-foreground max-w-[150px]">Comentários</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}