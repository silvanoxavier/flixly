"use client";

import { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, RefreshCw, QrCode } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { evolutionApi } from "~/lib/evolution";

interface ContextType {
  company: { id: string; name: string; instance: string };
}

interface Instance {
  _id: string;
  name: string;
  channel: string;
  status: string;
  number?: string;
  token?: string;
  createdAt: number;
}

const STORAGE_KEY = "flixly_instances";

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
  const [instances, setInstances] = useState<Instance[]>([]);

  const { company } = useOutletContext<ContextType>();
  const { toast } = useToast();

  // Gera token alfanumérico de 18 caracteres
  const generateToken = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 18; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Gera token automaticamente ao abrir o modal
  useEffect(() => {
    if (open && !token) {
      setToken(generateToken());
    }
  }, [open, token]);

  // Persistência localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setInstances(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(instances));
  }, [instances]);

  const loadInstances = useCallback(async () => {
    try {
      const res = await evolutionApi.listInstances();
      console.log("Instâncias reais:", res.data.data.instances);
      // Merge com local (futuro: sync com Prisma)
    } catch (error) {
      console.log("API indisponível, usando localStorage");
    }
  }, []);

  const fetchQR = async (instanceName: string) => {
    try {
      const res = await evolutionApi.getQRCode(instanceName);
      setQrCode(res.data.data.qrCode || "");
      setCurrentInstance(instanceName);
      toast({ title: "QR Code atualizado!" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro QR", description: error.response?.data || error.message });
    }
  };

  const pollStatus = useCallback(async (instanceName: string) => {
    try {
      const res = await evolutionApi.getConnectionState(instanceName);
      const status = res.data.data.status;
      setInstances(prev => prev.map(inst => 
        inst.name === instanceName ? { ...inst, status } : inst
      ));
    } catch {}
  }, []);

  const handleCreate = async () => {
    if (!name.trim() || !token.trim()) {
      toast({ variant: "destructive", title: "Nome e Token obrigatórios!" });
      return;
    }
    setLoading(true);
    try {
      const res = await evolutionApi.createInstance(name, channel, token, number || undefined);
      const newInstance: Instance = {
        _id: Date.now().toString(),
        name,
        channel,
        number: number || undefined,
        status: res.data.data.qrCode ? 'qrcode' : 'open',
        createdAt: Date.now(),
        token,
      };
      setInstances(prev => [...prev, newInstance]);
      loadInstances();
      if (res.data.data.qrCode) {
        setQrCode(res.data.data.qrCode);
        setCurrentInstance(name);
      }
      toast({ title: "Instância criada na Evolution!" });
      setActiveTab("manage");
      setName(""); 
      setToken(generateToken()); // Regenera para próxima
      setNumber("");
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro ao criar", description: error.response?.data?.message || error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) loadInstances();
    const interval = setInterval(() => instances.forEach(inst => pollStatus(inst.name)), 10000);
    return () => clearInterval(interval);
  }, [open, loadInstances, pollStatus, instances]);

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
          <DialogTitle>Instâncias Evolution - {company.name}</DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Criar</TabsTrigger>
            <TabsTrigger value="manage">Gerenciar ({instances.length})</TabsTrigger>
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
                  <SelectItem value="whatsapp-cloud-api">WhatsApp Cloud API</SelectItem>
                  <SelectItem value="evolution-api">Evolution API</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Token<span className="text-red-500 ml-1">*</span></Label>
              <Input 
                value={token} 
                readOnly 
                className="bg-muted cursor-not-allowed font-mono text-sm"
                placeholder="Gerando token..."
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
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Canal</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {instances.map((inst) => (
                    <TableRow key={inst._id}>
                      <TableCell>{inst.name}</TableCell>
                      <TableCell>{inst.channel}</TableCell>
                      <TableCell>{inst.number || '-'}</TableCell>
                      <TableCell><Badge variant={getStatusVariant(inst.status) as any}>{inst.status}</Badge></TableCell>
                      <TableCell>{new Date(inst.createdAt).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => fetchQR(inst.name)} className="mr-1">
                          <QrCode className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
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