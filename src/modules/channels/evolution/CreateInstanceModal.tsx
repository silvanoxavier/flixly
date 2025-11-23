"use client";

import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from "~/lib/supabase";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, RefreshCw, QrCode } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { evolutionApi } from "~/lib/evolution";

interface ContextType {
  company: { id: string; nome_fantasia: string; instance: string };
}

interface Instance {
  id?: string;
  instance_name: string;
  channel: string;
  status: string;
  number?: string;
  qrcode?: string;
  updated_at?: string;
}

const CreateInstanceModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [channel, setChannel] = useState("baileys");
  const [token, setToken] = useState("");
  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [currentInstance, setCurrentInstance] = useState("");
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create");

  const { company } = useOutletContext<ContextType>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: instances } = useQuery<Instance[]>({
    queryKey: ['whatsapp_sessions', company.id],
    queryFn: async () => {
      const { data } = await supabase
        .from('whatsapp_sessions')
        .select('*')
        .eq('company_id', company.id)
        .order('updated_at', { ascending: false });
      return data || [];
    },
    enabled: !!company.id && open,
  });

  const generateToken = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 18; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  useEffect(() => {
    if (open && !token) {
      setToken(generateToken());
    }
  }, [open, token]);

  const fetchQR = async (instanceName: string) => {
    try {
      const res = await evolutionApi.getQRCode(instanceName);
      setQrCode(res.data.data.qrCode || "");
      setCurrentInstance(instanceName);
      await supabase
        .from('whatsapp_sessions')
        .update({ qrcode: res.data.data.qrCode || null })
        .eq('instance_name', instanceName)
        .eq('company_id', company.id);
      queryClient.invalidateQueries({ queryKey: ['whatsapp_sessions', company.id] });
      toast({ title: "QR Code atualizado!" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro QR", description: error.response?.data || error.message });
    }
  };

  const handleCreate = async () => {
    if (!name.trim() || !token.trim()) {
      toast({ variant: "destructive", title: "Nome e Token obrigatórios!" });
      return;
    }
    setLoading(true);
    try {
      const res = await evolutionApi.createInstance(name, channel, token, number || undefined);
      const status = res.data.data.qrCode ? 'qrcode' : 'open';
      const payload = {
        company_id: company.id,
        instance_name: name,
        status,
        channel,
        number: number || null,
        token,
        qrcode: res.data.data.qrCode || null,
        updated_at: new Date().toISOString(),
      };

      const { data: existing } = await supabase
        .from('whatsapp_sessions')
        .select('id')
        .eq('company_id', company.id)
        .eq('instance_name', name)
        .single();

      let error;
      if (existing) {
        ({ error } = await supabase
          .from('whatsapp_sessions')
          .update(payload)
          .eq('id', existing.id));
      } else {
        ({ error } = await supabase
          .from('whatsapp_sessions')
          .insert([payload]));
      }

      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ['whatsapp_sessions', company.id] });
      if (res.data.data.qrCode) {
        setQrCode(res.data.data.qrCode);
        setCurrentInstance(name);
      }
      toast({ title: "Instância criada/atualizada no Supabase!" });
      setActiveTab("manage");
      setName(""); 
      setToken(generateToken());
      setNumber("");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro ao criar", description: error.response?.data?.message || error.message });
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status: string) => {
    if (status === "open" || status === "connected") return "default";
    if (status === "connecting" || status === "qrcode") return "secondary";
    return "destructive";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Nova Instância
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Instâncias Evolution - {company.nome_fantasia}</DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Criar</TabsTrigger>
            <TabsTrigger value="manage">Gerenciar ({instances?.length || 0})</TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="flex-1 flex flex-col mt-4 space-y-4 overflow-hidden p-1">
            <div className="space-y-2">
              <Label>Nome<span className="text-red-500 ml-1">*</span></Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="minha-instancia-1" />
            </div>
            <div className="space-y-2">
              <Label>Canal</Label>
              <Select value={channel} onValueChange={setChannel}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="baileys">Baileys</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Token<span className="text-red-500 ml-1">*</span></Label>
              <Input 
                value={token} 
                readOnly 
                className="bg-muted cursor-not-allowed font-mono text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label>Número (opcional)</Label>
              <Input value={number} onChange={(e) => setNumber(e.target.value)} placeholder="5511999999999" />
            </div>
            <Button onClick={handleCreate} disabled={!name.trim() || !token.trim() || loading} className="w-full">
              {loading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <QrCode className="mr-2 h-4 w-4" />}
              {loading ? "Criando..." : "Criar Instância"}
            </Button>
          </TabsContent>
          <TabsContent value="manage" className="flex-1 flex flex-col mt-4 space-y-4 overflow-hidden p-1">
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Canal</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Atualizado</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {instances?.map((inst) => (
                    <TableRow key={inst.id || inst.instance_name}>
                      <TableCell>{inst.instance_name}</TableCell>
                      <TableCell>{inst.channel}</TableCell>
                      <TableCell>{inst.number || '-'}</TableCell>
                      <TableCell><Badge variant={getStatusVariant(inst.status)}>{inst.status}</Badge></TableCell>
                      <TableCell>{inst.updated_at ? new Date(inst.updated_at).toLocaleDateString("pt-BR") : '-'}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => fetchQR(inst.instance_name)}>
                          <QrCode className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  )) || []}
                </TableBody>
              </Table>
            </div>
            {qrCode && (
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="mb-2 font-medium">QR Code: {currentInstance}</p>
                <img src={`data:image/png;base64,${qrCode}`} alt="QR" className="mx-auto max-w-xs rounded shadow-lg" />
                <p className="mt-2 text-sm text-muted-foreground">Escaneie com WhatsApp</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInstanceModal;