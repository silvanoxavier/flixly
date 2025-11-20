"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Automations = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle>Boas-vindas Automática</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span>Ativar</span>
          <Switch />
        </div>
        <Input placeholder="Mensagem de boas-vindas..." />
        <Button>Salvar</Button>
      </CardContent>
    </Card>
    {/* Mais automações */}
  </div>
);

export default Automations;