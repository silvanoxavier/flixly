"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw, Power, QrCode } from "lucide-react";
import { evolutionApi } from "~/lib/evolution";

const ManageInstanceModal = () => {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<"connected" | string>("connected");

  const fetchStatus = async () => {
    try {
      const res = await evolutionApi.getStatus("inst1");
      setStatus(res.data.status || "connected");
    } catch {}
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button>Gerenciar Instância</Button></DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader><DialogTitle>Instância inst1</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <Badge variant={status === "connected" ? "default" : "secondary"}>{status}</Badge>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={fetchStatus}><RefreshCw className="mr-1 h-4 w-4" /> Status</Button>
            <Button variant="outline" size="sm"><QrCode className="mr-1 h-4 w-4" /> QR</Button>
            <Button variant="outline" size="sm"><Power className="mr-1 h-4 w-4" /> Reiniciar</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ManageInstanceModal;