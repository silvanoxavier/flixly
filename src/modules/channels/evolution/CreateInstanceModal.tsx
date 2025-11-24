"use client";

import { useState, useEffect, useRef } from "react";
import { useCompany } from "@/providers/CompanyProvider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, RefreshCw, QrCode, Trash2, Play, StopCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  channel?: string; // Adicionado para exibir na tabela
  session_data?: { token?: string; channel?: string }; // Adicionado para acessar o token e o canal
}

export default function CreateInstanceModal() {
  const { selectedCompany: company } = useCompany();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [instanceName, setInstanceName] = useState("");
  const [channel, setChannel] = useState("baileys");
  const [token, setToken] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [polling, setPolling] = useState(false);
  const [status, setStatus] = useState("qrcode");
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

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

  const generateToken = () => {
    const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let newToken = "";
    for (let i = 0; i < 35; i++) {
      newToken += charset[Math.floor(Math.random() * charset.length)];
    }
    setToken(newToken);
  };

  useEffect(() => {
    if (open) {
      generateToken(); // Auto-gerar token ao abrir modal
      setInstanceName(""); // Limpa o nome da instância
      setChannel("baileys"); // Reseta o canal
      setQrCode(""); // Limpa QR Code
      setStatus("qrcode"); // Reseta status
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        setPolling(false);
      }
    }
  }, [open]);

  const handleCreateInstance = async () => {
    if (!instanceName.trim() || !channel || !token || !company?.id) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      // POST /manager/createInstance na Evolution API
      const res = await fetch(`${import.meta.env.VITE_EVOLUTION_API_URL}/manager/createInstance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: import.meta.env.VITE_EVOLUTION_API_KEY,
        },
        body: JSON.stringify({
          instanceName: instanceName.trim(),
          channel,
          token,
          qrcode: true, // Gera QR imediatamente
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || `Erro ${res.status}`);
      }

      const data = await res.json();
      if (data.status && data.data?.qrCode) {
        setQrCode(data.data.qrCode);

        // Salva no Supabase
        const { error: supabaseError } = await supabase.from("whatsapp_sessions").insert({
          company_id: company.id,
          instance_name: instanceName.trim(),
          channel,
          session_data: { token, channel }, // Armazena token e channel na session_data JSONB
          status: "qrcode",
          qr_code_data: data.data.qrCode,
        });

        if (supabaseError) throw supabaseError;

        queryClient.invalidateQueries({ queryKey: ["whatsapp_sessions"] });
        toast.success("Instância criada com sucesso! Escaneie o QR Code.");

        // Poll status até CONNECTED
        setPolling(true);
        pollIntervalRef.current = setInterval(async () => {
          try {
            const statusRes = await fetch(
              `${import.meta.env.VITE_EVOLUTION_API_URL}/instance/connectionState/${instanceName.trim()}`,
              {
                headers: { apikey: import.meta.env.VITE_EVOLUTION_API_KEY },
              }
            );
            const statusData = await statusRes.json();
            setStatus(statusData.status || "unknown");

            if (statusData.status === "CONNECTED") {
              await supabase
                .from("whatsapp_sessions")
                .update({ status: "connected" })
                .eq("instance_name", instanceName.trim());
              toast.success("Instância conectada!");
              if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
              setPolling(false);
            }
          } catch (pollError) {
            console.error("Erro no poll:", pollError);
          }
        }, 3000);

        // Cleanup poll após 5min ou close
        setTimeout(() => {
          if (pollIntervalRef.current) clearInterval(pollIntervalRef.current);
          setPolling(false);
        }, 300000);
      } else {
        toast.error("Falha na criação da instância.");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar instância.");
    } finally {
      setLoading(false);
    }
  };

  const refreshQR = async (instanceName: string) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_EVOLUTION_API_URL}/instance/qrCode/${instanceName}`,
        {
          headers: { apikey: import.meta.env.VITE_EVOLUTION_API_KEY },
        }
      );
      const data = await res.json();
      if (data.qrCode) {
        setQrCode(data.qrCode);
        toast.success("QR Code atualizado!");
      }
    } catch (error) {
      toast.error("Erro ao atualizar QR");
    }
  };

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
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Nova Instância
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Instâncias WhatsApp (Evolution API)</DialogTitle>
          <DialogDescription>
            Crie ou gerencie suas instâncias para enviar/receber mensagens.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="create" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Criar Nova</TabsTrigger>
            <TabsTrigger value="manage">Gerenciar</TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="flex-1 flex flex-col mt-4 space-y-4 overflow-hidden p-6">
            {/* Nome da Instância */}
            <div className="space-y-2">
              <Label htmlFor="instance-name">Nome da Instância *</Label>
              <Input
                id="instance-name"
                placeholder="ex: minha-empresa-001"
                value={instanceName}
                onChange={(e) => setInstanceName(e.target.value)}
              />
            </div>
            
            {/* Canal */}
            <div className="space-y-2">
              <Label htmlFor="channel">Canal *</Label>
              <Select value={channel} onValueChange={setChannel}>
                <SelectTrigger id="channel">
                  <SelectValue placeholder="Escolha o canal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baileys">Baileys</SelectItem>
                  <SelectItem value="whatsapp-cloud-api">WhatsApp Cloud API</SelectItem>
                  <SelectItem value="evolution">Evolution</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Token Auto-gerado */}
            <div className="space-y-2">
              <Label>Token (Auto-gerado 35 caracteres)</Label>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={token}
                  placeholder="Clique para gerar..."
                  className="flex-1"
                />
                <Button type="button" variant="outline" size="sm" onClick={generateToken}>
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Token único para autenticação segura da instância.</p>
            </div>
            
            {/* Botão Criar */}
            <Button
              onClick={handleCreateInstance}
              disabled={!instanceName.trim() || !channel || !token || loading}
              className="w-full"
            >
              {loading ? (
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
            
            {/* QR Code (após criação) */}
            {qrCode && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 border-2 border-dashed border-muted rounded-lg bg-muted/50">
                <QrCode className="h-16 w-16 mb-4 text-primary" />
                <p className="text-sm font-medium mb-4">QR Code gerado! Escaneie com o WhatsApp.</p>
                <div className="w-64 h-64 border rounded-lg overflow-hidden shadow-lg">
                  <img src={qrCode} alt="QR Code WhatsApp" className="w-full h-full object-contain" />
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant={status === "CONNECTED" ? "default" : "secondary"}>
                    {status} {polling && <RefreshCw className="h-3 w-3 animate-spin ml-1" />}
                  </Badge>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Gerenciar Instâncias */}
          <TabsContent value="manage" className="flex-1 flex flex-col mt-4 space-y-4 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Canal</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {instances.map((instance: Instance) => (
                  <TableRow key={instance.id}>
                    <TableCell>{instance.instance_name}</TableCell>
                    <TableCell>{instance.session_data?.channel || "baileys"}</TableCell>
                    <TableCell>
                      <Badge variant={instance.status === "connected" ? "default" : "secondary"}>
                        {instance.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="space-x-2">
                      <Button size="sm" variant="outline" onClick={() => refreshQR(instance.instance_name)}>
                        <QrCode className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <StopCircle className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => deleteInstance(instance.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {instances.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                      Nenhuma instância criada
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}