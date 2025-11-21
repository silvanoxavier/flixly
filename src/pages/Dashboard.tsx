"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageCircle, FileBarChart, Building2 } from "lucide-react";

const stats = [
  { title: "Empresas", value: "12", change: "+20%", icon: Building2 },
  { title: "Chats", value: "23", change: "+5%", icon: MessageCircle },
  { title: "Relatórios", value: "1.247", change: "+12%", icon: FileBarChart },
  { title: "Clientes", value: "456", change: "+3%", icon: Users },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto h-full">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral da sua operação Flixly.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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