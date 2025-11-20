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
  createdAt: number;
  token?: string;
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
  const [instances, setInstances] = useState<Instance[]>([]);

  const { company } = useOutletContext<ContextType>();
  const { toast } = useToast();

  const fetchQR = async (instanceName: string) => {
    try {
      const res = await evolutionApi.getQRCode(instanceName);
      setQrCode(res.data.data.qrCode);
      setCurrentInstance(instanceName);
      toast({ title: "QR Code gerado!" });
    } catch (error) {
      toast({ variant: "destructive", title: "Erro ao gerar QR", description: (error as Error).message });
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
      const newInstance: Instance = {
        _id: Date.now().toString(),
        name,
        channel,
        number: number || undefined,
        status: 'qrcode',
        createdAt: Date.now(),
        token,
      };
      setInstances(prev => [...prev, newInstance]);
      if (res.data.data.qrCode) {
        setQrCode(res.data.data.qrCode);
        setCurrentInstance(name);
      }
      toast({ title: "Instância criada com sucesso!" });
      setActiveTab("manage");
      setName("");
      setToken("");
      setNumber("");
    } catch (error) {
      toast({ variant: "destructive", title: "Erro ao criar instância", description: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  const pollAllStatuses = useCallback(async () => {
    console.log('Polling statuses...');
  }, []);

  useEffect(() => {
    const interval = setInterval(pollAllStatuses, 10000);
    return () => clearInterval(interval);
  }, [pollAllStatuses]);

  const getStatusVariant = (status: string) => {
    if (status === "open") return "default" as const;
    if (status === "connecting" || status === "qr" || status === "qrcode") return "secondary" as const;
    return "destructive" as const;
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
        <Tabs value={activeTab} onValueChange={setActiveTab as any} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="create">Criar</TabsTrigger>
            <TabsTrigger value="manage">Gerenciar ({instances.length}/5)</TabsTrigger>
          </TabsList>
          <TabsContent value="create" className="flex-1 flex flex-col mt-4 space-y-4 overflow-hidden">
            <div className="space-y-2">
              <Label>Nome da Instância *</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="ex: minha-instancia" />
            </div>
            <div className="space-y-2">
              <Label>Canal</Label>
              <Select value={channel} onValueChange={setChannel}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baileys">Baileys</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Token *</Label>
              <Input value={token} onChange={(e) => setToken(e.target.value)} placeholder="ex: 05BBCIA62B-2E5B-67B8-7355" />
            </div>
            <div className="space-y-2">
              <Label>Número (opcional)</Label>
              <Input value={number} onChange={(e) => setNumber(e.target.value)} placeholder="ex: 5511999999999" />
            </div>
            <Button onClick={handleCreate} disabled={!name.trim() || !token.trim() || loading} className="w-full">
              {loading ? <RefreshCw className="mr-2 h-4 w-4 animate-spin" /> : <QrCode className="mr-2 h-4 w-4" />}
              {loading ? "Criando..." : "Salvar"}
            </Button>
            {qrCode && currentInstance === name && (
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="mb-2">QR Code para {name}:</p>
                <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" className="mx-auto max-w-sm rounded shadow" />
              </div>
            )}
          </TabsContent>
          <TabsContent value="manage" className="flex-1 flex flex-col mt-4 space-y-4 overflow-hidden">
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Canal</TableHead>
                    <TableHead>Número</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Criado em</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {instances.map((inst) => (
                    <TableRow key={inst._id}>
                      <TableCell>{inst.name}</TableCell>
                      <TableCell>{inst.channel}</TableCell>
                      <TableCell>{inst.number || '-'}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusVariant(inst.status)}>{inst.status}</Badge>
                      </TableCell>
                      <TableCell>{new Date(inst.createdAt).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" onClick={() => fetchQR(inst.name)}>
                          <QrCode className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {qrCode && currentInstance && (
              <div className="p-4 bg-muted rounded-lg text-center">
                <p className="mb-2">QR Code para {currentInstance}:</p>
                <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" className="mx-auto max-w-sm rounded shadow" />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInstanceModal;