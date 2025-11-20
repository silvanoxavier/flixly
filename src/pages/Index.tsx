"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, BarChart3, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageCircle className="mr-2 h-6 w-6" />
          Chat Ativo
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">23</div>
        <Button asChild variant="link" className="mt-2">
          <Link to="/chat">Abrir Chat</Link>
        </Button>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="mr-2 h-6 w-6" />
          Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">1.247</div>
        <Button asChild variant="link" className="mt-2">
          <Link to="/analytics">Ver Relatório</Link>
        </Button>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-6 w-6" />
          Clientes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">456</div>
        <Button asChild variant="link" className="mt-2">
          <Link to="/customers">Gerenciar</Link>
        </Button>
      </CardContent>
    </Card>
  </div>
);

export default Index;