"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageCircle, Smartphone } from "lucide-react";

const stats = [
  { title: "Empresas", value: "12", change: "+20%", icon: Users },
  { title: "Clientes", value: "1.234", change: "+12%", icon: Users },
  { title: "Mensagens", value: "5.678", change: "+8%", icon: MessageCircle },
  { title: "Instâncias", value: "8/20", change: "+2", icon: Smartphone },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto w-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral da sua operação Flixly.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}