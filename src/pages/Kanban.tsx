"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";

interface Item {
  id: number;
  title: string;
}

export default function Kanban() {
  const [columns, setColumns] = useState<Record<string, Item[]>>({
    novo: [{ id: 1, title: "Pedido #123" }],
    preparo: [{ id: 2, title: "Pedido #124" }],
    entrega: [],
    finalizado: [{ id: 3, title: "Pedido #122" }],
  });
  const [nextId, setNextId] = useState(4);
  const [showNewCard, setShowNewCard] = useState(false);
  const [showNewColumn, setShowNewColumn] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newColumnName, setNewColumnName] = useState("");

  const moveItem = useCallback((itemId: number, targetColumn: string) => {
    setColumns((prev) => {
      const newCols = { ...prev };
      for (const [col, items] of Object.entries(newCols)) {
        const index = items.findIndex((i) => i.id === itemId);
        if (index > -1) {
          const [movedItem] = newCols[col].splice(index, 1);
          newCols[targetColumn].push(movedItem);
          break;
        }
      }
      return newCols;
    });
  }, []);

  const addNewCard = () => {
    if (!newCardTitle.trim()) return;
    setColumns((prev) => ({
      ...prev,
      novo: [...(prev.novo || []), { id: nextId, title: newCardTitle.trim() }],
    }));
    setNextId((p) => p + 1);
    setNewCardTitle("");
    setShowNewCard(false);
  };

  const addNewColumn = () => {
    const name = newColumnName.trim().toLowerCase();
    if (!name || columns[name]) return;
    setColumns((prev) => ({ ...prev, [name]: [] }));
    setNewColumnName("");
    setShowNewColumn(false);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer.setData("text/plain", id.toString());
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, columnKey: string) => {
    const id = parseInt(e.dataTransfer.getData("text/plain"));
    moveItem(id, columnKey);
  };

  return (
    <div className="space-y-6 w-full h-full p-4 md:p-6">
      {/* Botões topo */}
      <div className="flex gap-3 mb-6">
        <Dialog open={showNewCard} onOpenChange={setShowNewCard}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Card
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo Pedido</DialogTitle>
              <DialogDescription>Título do pedido (adicionado em "novo")</DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="card-title">Título</Label>
              <Input
                id="card-title"
                value={newCardTitle}
                onChange={(e) => setNewCardTitle(e.target.value)}
                placeholder="Ex: Pedido #125"
              />
            </div>
            <DialogFooter>
              <Button onClick={addNewCard} disabled={!newCardTitle.trim()}>
                Criar Card
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showNewColumn} onOpenChange={setShowNewColumn}>
          <DialogTrigger asChild>
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Nova Coluna
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nova Coluna</DialogTitle>
              <DialogDescription>Nome da coluna de status (ex: "pago")</DialogDescription>
            </DialogHeader>
            <div className="space-y-2">
              <Label htmlFor="column-name">Nome</Label>
              <Input
                id="column-name"
                value={newColumnName}
                onChange={(e) => setNewColumnName(e.target.value)}
                placeholder="Ex: pago"
              />
            </div>
            <DialogFooter>
              <Button onClick={addNewColumn} disabled={!newColumnName.trim() || !!columns[newColumnName.trim().toLowerCase()]}>
                Criar Coluna
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Colunas RESPONSIVAS: Mobile vertical stack (w-full), lg+ horizontal scroll (w-64) */}
      <div 
        className="flex flex-col lg:flex-row lg:gap-4 lg:overflow-x-auto lg:pb-8 lg:snap-x lg:snap-mandatory scrollbar-thin lg:[&::-webkit-scrollbar]:h-2 lg:[&::-webkit-scrollbar-thumb]:rounded-full lg:scrollbar-thumb-muted-foreground/60 lg:scrollbar-track-transparent scroll-smooth h-full"
        style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgb(148 163 184 / 0.6) transparent' }}
      >
        {Object.entries(columns).map(([key, items]) => (
          <Card key={key} className="w-full lg:w-64 lg:flex-shrink-0 min-h-[400px] lg:min-h-[500px] lg:snap-center flex flex-col">
            <CardContent 
              className="p-4 h-full flex flex-col"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, key)}
            >
              <h3 className="font-bold capitalize mb-4 text-lg tracking-tight flex-shrink-0">
                {key.replace(/^\w/, (c) => c.toUpperCase())}
              </h3>
              <div className="flex-1 space-y-2 overflow-y-auto pb-2">
                {items.map((item) => (
                  <Card
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    className="p-3 bg-muted/50 hover:bg-muted cursor-grab active:cursor-grabbing active:scale-[0.98] transition-all duration-200 shadow-sm border hover:border-primary/50"
                  >
                    <div className="font-medium text-sm">{item.title}</div>
                  </Card>
                ))}
                {items.length === 0 && (
                  <div className="flex items-center justify-center text-muted-foreground text-sm h-full">
                    Solte cards aqui
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}