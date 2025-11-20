"use client";

import { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { evolutionApi } from "~/lib/evolution";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, QrCode, Smartphone } from "lucide-react";

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

const ManageInstanceModal = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [currentInstance, setCurrentInstance] = useState("");
  const [instances, setInstances] = useState<Instance[]>([]);

  const { company } = useOutletContext<ContextType>();
  const { toast } = useToast();

  // Carrega do localStorage (sync com CreateInstanceModal)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) setInstances(JSON.parse(saved));
  }, []);

  const fetchStatus = useCallback(async (instanceName: string) => {
    try {
      const res = await evolutionApi.getConnectionState(instanceName);
      // Fix TS2345: res.data.data.status é string (não res.data.status boolean)
      const status = typeof res.data.data.status === "string" 
        ? res.data.data.status 
        : String(res.data.data.status || "connected");
      setInstances(prev => prev.map(inst => 
        inst.name === instanceName ? { ...inst, status } : inst
      ));
      return status;
    } catch (error: any) {
      console.error("Erro status:", error);
      return "error";
    }
  }, []);

  const fetchQR = async (instanceName: string) => {
    setLoading(true);
    try {
      const res = await evolutionApi.getQRCode(instanceName);
      setQrCode(res.data.data.qrCode || "");
      setCurrentInstance(instanceName);
      toast({ title: "QR Code carregado!" });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Erro QR", description: error.message });
    } finally {
      setLoading(false);
    }
  };

  const refreshAll = async () => {
    setLoading(true);
    try {
      await Promise.all(instances.map(inst => fetchStatus(inst.name)));
      toast({ title: "Status atualizados!" });
    } catch {}
    setLoading(false);
  };

  // Polling automático
  useEffect(() => {
    if (open) refreshAll();
    const interval = setInterval(refreshAll, 10000);
    return () => clearInterval(interval);
  }, [open]);

  const getStatusVariant = (status: string) => {
    if (status === "open" || status === "connected") return "default";
    if (status === "qrcode" || status === "qr") return "secondary";
    return "destructive";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Smartphone className="mr-2 h-4 w-4" /> Gerenciar Instâncias
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Gerenciar Instâncias - {company.name}</DialogTitle>
        </DialogHeader>
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex gap-2 mb-4">
            <Button onClick={refreshAll} disabled={loading} variant="outline" size="sm">
              {loading ? <RefreshCw className="mr-2 h-3 w-3 animate-spin" /> : <RefreshCw className="mr-2 h-3 w-3" />}
              Atualizar Todos
            </Button>
          </div>
          <div className="flex-1 overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Canal</TableHead>
                  <TableHead>Número</TableHead>
                  <TableHead>Status</TableHead>
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
                      <Badge variant={getStatusVariant(inst.status) as any}>{inst.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="ghost" onClick={() => fetchQR(inst.name)} className="mr-1">
                        <QrCode className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {qrCode && currentInstance && (
            <div className="p-4 bg-muted rounded-lg text-center mt-4">
              <p className="mb-2 font-medium">QR Code: {currentInstance}</p>
              <img src={`data:image/png;base64,${qrCode}`} alt="QR Code" className="mx-auto max-w-xs rounded shadow-lg" />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageInstanceModal;