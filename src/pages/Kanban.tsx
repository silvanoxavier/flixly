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
    <div className="space-y-6 w-full max-w-7xl mx-auto h-full p-4">
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

      {/* Colunas Kanban */}
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {Object.entries(columns).map(([key, items]) => (
          <Card key={key} className="w-64 flex-shrink-0 min-h-[400px]">
            <CardContent 
              className="p-4 min-h-[200px] flex flex-col"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, key)}
            >
              <h3 className="font-bold capitalize mb-4 text-lg tracking-tight">
                {key.replace(/^\w/, (c) => c.toUpperCase())}
              </h3>
              {items.map((item) => (
                <Card
                  key={item.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, item.id)}
                  className="mb-2 p-3 bg-muted/50 hover:bg-muted cursor-grab active:cursor-grabbing active:scale-[0.98] transition-all duration-200 shadow-sm border hover:border-primary/50"
                >
                  <div className="font-medium text-sm">{item.title}</div>
                </Card>
              ))}
              {items.length === 0 && (
                <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm mt-4">
                  Solte cards aqui
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}