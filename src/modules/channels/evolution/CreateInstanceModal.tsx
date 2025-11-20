"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { evolutionApi } from "~/lib/evolution";

const CreateInstanceModal = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const createInstance = async () => {
    console.log("Criando instância:", name);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button><Plus className="mr-2 h-4 w-4" /> Nova Instância</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Criar Instância Evolution</DialogTitle></DialogHeader>
        <div className="space-y-4">
          <div><Label>Nome</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
          <div><Label>Token API</Label><Input placeholder="Token da Evolution" /></div>
          <Button onClick={createInstance}>Gerar Instância</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateInstanceModal;