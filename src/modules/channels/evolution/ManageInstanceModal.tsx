"use client";

import { useState } from "react";
import { useCompany } from "@/providers/CompanyProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { QrCode, Play, StopCircle, Trash2, RefreshCw } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

interface Instance {
  id: string;
  instance_name: string;
  status: string;
  company_id: string;
}

export default function ManageInstanceModal() {
  const { selectedCompany: company } = useCompany();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data: instances = [] } = useQuery<Instance[]>({
    queryKey: ["whatsapp_sessions", company?.id],
    queryFn: async () => {
      if (!company?.id) return [];
      const { data } = await supabase
        .from("whatsapp_sessions")
        .select("*")
        .eq("company_id", company.id);
      return data || [];
    },
    enabled: !!company?.id,
  });

  const deleteInstance = async (id: string) => {
    if (!confirm("Excluir instância?")) return;
    try {
      await supabase.from("whatsapp_sessions").delete().eq("id", id);
      queryClient.invalidateQueries({ queryKey: ["whatsapp_sessions"] });
      toast.success("Instância excluída");
    } catch (error) {
      toast.error("Erro ao excluir");
    }
  };

  if (!company) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <RefreshCw className="h-4 w-4 mr-2" />
          Gerenciar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Gerenciar Instâncias</DialogTitle>
          <DialogDescription>Controle suas instâncias WhatsApp ativas.</DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {instances.map((instance) => (
              <TableRow key={instance.id}>
                <TableCell>{instance.instance_name}</TableCell>
                <TableCell>
                  <Badge variant={instance.status === "connected" ? "default" : "secondary"}>
                    {instance.status}
                  </Badge>
                </TableCell>
                <TableCell className="space-x-1">
                  <Button size="sm" variant="outline">
                    <QrCode className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <StopCircle className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteInstance(instance.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
}