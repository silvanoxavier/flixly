"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Reports() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Mensagens Enviadas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-primary">5.678</div>
          </CardContent>
        </Card>
        {/* Mais cards/charts aqui */}
      </div>
    </div>
  );
}