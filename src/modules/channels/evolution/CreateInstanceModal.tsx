"use client";

import { useState, useEffect } from "react";
import { useCompany } from "@/providers/CompanyProvider";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { evolutionApi } from "@/lib/evolution";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, RefreshCw, QrCode, Trash2, Play, StopCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface Instance {
  id: string;
  instance_name: string;
  status: string;
  company_id: string;
}

export default function CreateInstanceModal() {
  const { selectedCompany: company } = useCompany();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [instanceName, setInstanceName] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [polling, setPolling] = useState(false);

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

  const createInstance = async () => {
    if (!instanceName.trim() || !company?.id) return;
    try {
      setPolling(true);
      const res = await evolutionApi.createInstance(instanceName);
      if (res.data.status) {
        setQrCode(res.data.data.qrCode || "");
        toast.success("Instância criada! Escaneie o QR Code.");
        await supabase.from("whatsapp_sessions").insert({
          company_id: company.id,
          instance_name: instanceName,
          status: "qrcode",
        });
        queryClient.invalidateQueries({ queryKey: ["whatsapp_sessions"] });
      }
    } catch (error) {
      toast.error("Erro ao criar instância");
    } finally {
      setPolling(false);
    }
  };

  const refreshQR = async (instanceName: string) => {
    try {
      const res = await evolutionApi.getQRCode(instanceName);
      if (res.data.status) {
        setQrCode(res.data.data.qrCode || "");
      }
    } catch (error) {
      toast.error("Erro ao atualizar QR");
    }
  };

  const deleteInstance = async (id: string, instanceName: string) => {
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
        <Button>
          <QrCode className="h-4 w-4 mr-2" />
          Gerenciar Instâncias
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Instâncias WhatsApp (Evolution API)</DialogTitle>
          <DialogDescription>
            Crie ou gerencie suas instâncias para enviar/receber mensagens.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="manage" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Criar Nova</TabsTrigger>
            <TabsTrigger value="manage">Gerenciar</TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="flex-1 flex flex-col mt-4 space-y-4 overflow-hidden">
            <div className="space-y-2">
              <Label htmlFor="instance-name">Nome da Instância</Label>
              <Input
                id="instance-name"
                value={instanceName}
                onChange={(e) => setInstanceName(e.target.value)}
                placeholder="ex: minha-empresa-001"
              />
            </div>
            <Button onClick={createInstance} disabled={!instanceName || polling} className="w-full">
              {polling ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Criando...
                </>
              ) : (
                <>
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Instância
                </>
              )}
            </Button>
            {qrCode && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-muted rounded-lg">
                <QrCode className="h-16 w-16 mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground mb-4">QR Code gerado:</p>
                <pre className="bg-muted p-4 rounded text-xs font-mono max-w-full overflow-auto whitespace-pre-wrap text-center">
                  {qrCode}
                </pre>
              </div>
            )}
          </TabsContent>
          <TabsContent value="manage" className="flex-1 flex flex-col mt-4 space-y-4 overflow-hidden">
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
                    <TableCell className="space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => refreshQR(instance.instance_name)}
                      >
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
                        onClick={() => deleteInstance(instance.id, instance.instance_name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}