"use client";

import { useAuth } from '@/providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { QrCode, Building2, CheckCircle, AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import CreateInstanceModal from "../modules/channels/evolution/CreateInstanceModal";
import { useNavigate, useOutletContext } from "react-router-dom";

interface Company {
  id: string;
  nome_fantasia: string;
  name: string; // Adicionado
  instance: string; // Adicionado
}

interface ContextType {
  company: Company | null;
}

interface Empresa {
  id: string;
  nome_fantasia: string;
  cnpj: string;
  plano_id: string;
  whatsapp_sessions?: { status: string }[];
}

export default function Companies() {
  const navigate = useNavigate();
  // Acessa o contexto de forma segura
  const context = useOutletContext<ContextType>();
  const selectedCompany = context?.company; // Acesso seguro com optional chaining
  const { session } = useAuth();

  const { data: empresas, isLoading } = useQuery<Empresa[]>({
    queryKey: ['empresas-user'],
    queryFn: async () => {
      if (!session?.user.id) return [];
      const { data, error } = await supabase.rpc('get_client_companies', {
        client_user_id: session.user.id
      });
      if (error) throw error;
      
      const empresasWithStatus = await Promise.all(
        (data || []).map(async (raw: any) => {
          const empresa = { ...raw, id: raw.empresa_id };
          const { data: sessions } = await supabase
            .from('whatsapp_sessions')
            .select('status')
            .eq('company_id', empresa.id)
            .single();
          return { ...empresa, whatsapp_sessions: sessions ? [sessions] : [] };
        })
      );
      return empresasWithStatus;
    },
    enabled: !!session?.user.id,
  });

  const getWhatsappStatus = (empresa: Empresa) => {
    const session = empresa.whatsapp_sessions?.[0];
    if (!session) return { variant: 'secondary' as const, text: 'Sem sessão', icon: AlertCircle };
    if (session.status === 'connected') return { variant: 'default' as const, text: 'Conectada', icon: CheckCircle };
    return { variant: 'destructive' as const, text: session.status || 'Desconectada', icon: AlertCircle };
  };

  // Renderiza um skeleton se os dados estiverem carregando
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 gap-4">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Building2 className="h-7 w-7 text-primary" />
            Minhas Empresas
          </h1>
          <p className="text-muted-foreground">Gerencie suas empresas e instâncias WhatsApp.</p>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Empresas Associadas</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome Fantasia</TableHead>
                <TableHead>CNPJ</TableHead>
                <TableHead>Status WhatsApp</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {empresas?.map((empresa) => {
                const waStatus = getWhatsappStatus(empresa);
                return (
                  <TableRow key={empresa.id} className={selectedCompany?.id === empresa.id ? 'bg-accent/50' : ''}>
                    <TableCell className="font-medium">{empresa.nome_fantasia}</TableCell>
                    <TableCell>{empresa.cnpj}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <waStatus.icon className="h-4 w-4" />
                        <Badge variant={waStatus.variant}>{waStatus.text}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => navigate(`/channels?companyId=${empresa.id}`)} // Redireciona para canais com ID da empresa
                        >
                          <QrCode className="h-4 w-4 mr-1" /> Gerenciar
                        </Button>
                        <CreateInstanceModal />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              }) || <TableRow><TableCell colSpan={4} className="text-center py-8 text-muted-foreground">Nenhuma empresa encontrada. Crie uma conta!</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}