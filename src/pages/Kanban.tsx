"use client";

import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit3, Trash2 } from "lucide-react";

interface Item {
  id: number;
  title: string;
}

interface Column {
  color: string;
  items: Item[];
}

export default function Kanban() {
  const [columns, setColumns] = useState<Record<string, Column>>({
    novo: { 
      color: "#ef4444", 
      items: [{ id: 1, title: "Pedido #123" }] 
    },
    preparo: { 
      color: "#f59e0b", 
      items: [{ id: 2, title: "Pedido #124" }] 
    },
    entrega: { 
      color: "#10b981", 
      items: [] 
    },
    finalizado: { 
      color: "#3b82f6", 
      items: [{ id: 3, title: "Pedido #122" }] 
    },
  });
  const [nextId, setNextId] = useState(4);
  const [showNewCard, setShowNewCard] = useState(false);
  const [showNewColumn, setShowNewColumn] = useState(false);
  const [showEditColumn, setShowEditColumn] = useState(false);
  const [editingColumnKey, setEditingColumnKey] = useState<string | null>(null);
  const [newCardTitle, setNewCardTitle] = useState("");
  const [newColumnName, setNewColumnName] = useState("");
  const [newColumnColor, setNewColumnColor] = useState("#3b82f6");
  const [editColumnName, setEditColumnName] = useState("");
  const [editColumnColor, setEditColumnColor] = useState("#3b82f6");

  const moveItem = useCallback((itemId: number, targetColumn: string) => {
    setColumns((prev) => {
      const newCols = { ...prev };
      for (const [col, column] of Object.entries(newCols)) {
        const index = column.items.findIndex((i) => i.id === itemId);
        if (index > -1) {
          const [movedItem] = newCols[col].items.splice(index, 1);
          newCols[targetColumn].items.push(movedItem);
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
      novo: {
        ...prev.novo,
        items: [...(prev.novo?.items || []), { id: nextId, title: newCardTitle.trim() }],
      },
    }));
    setNextId((p) => p + 1);
    setNewCardTitle("");
    setShowNewCard(false);
  };

  const addNewColumn = () => {
    const name = newColumnName.trim().toLowerCase();
    if (!name || columns[name]) return;
    setColumns((prev) => ({ 
      ...prev, 
      [name]: { 
        color: newColumnColor, 
        items: [] 
      } 
    }));
    setNewColumnName("");
    setNewColumnColor("#3b82f6");
    setShowNewColumn(false);
  };

  const openEditColumn = (key: string) => {
    const column = columns[key];
    if (!column) return;
    setEditingColumnKey(key);
    setEditColumnName(key);
    setEditColumnColor(column.color);
    setShowEditColumn(true);
  };

  const saveEditColumn = () => {
    if (!editingColumnKey || !editColumnName.trim()) return;
    const newName = editColumnName.trim().toLowerCase();
    if (newName !== editingColumnKey && columns[newName]) return; // Duplicado

    setColumns((prev) => {
      const newCols = { ...prev };
      const oldColumn = newCols[editingColumnKey];
      if (newName !== editingColumnKey) {
        // Rename: move para novo key
        newCols[newName] = { color: editColumnColor, items: [...oldColumn.items] };
        delete newCols[editingColumnKey];
      } else {
        // Só cor
        newCols[editingColumnKey] = { ...oldColumn, color: editColumnColor };
      }
      return newCols;
    });

    setShowEditColumn(false);
    setEditingColumnKey(null);
  };

  const deleteColumn = () => {
    if (!editingColumnKey || columns[editingColumnKey]?.items.length > 0) return;
    setColumns((prev) => {
      const newCols = { ...prev };
      delete newCols[editingColumnKey!];
      return newCols;
    });
    setShowEditColumn(false);
    setEditingColumnKey(null);
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
              <DialogDescription>Nome e cor da coluna de status</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="column-name">Nome</Label>
                <Input
                  id="column-name"
                  value={newColumnName}
                  onChange={(e) => setNewColumnName(e.target.value)}
                  placeholder="Ex: pago"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="column-color">Cor de fundo</Label>
                <Input
                  id="column-color"
                  type="color"
                  value={newColumnColor}
                  onChange={(e) => setNewColumnColor(e.target.value)}
                  className="w-20 h-12 border-2 border-border rounded-md cursor-pointer hover:border-primary"
                />
              </div>
            </div>
            <DialogFooter>
              <Button 
                onClick={addNewColumn} 
                disabled={!newColumnName.trim() || !!columns[newColumnName.trim().toLowerCase()]}
              >
                Criar Coluna
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Modal Editar Coluna */}
      <Dialog open={showEditColumn} onOpenChange={setShowEditColumn}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Coluna</DialogTitle>
            <DialogDescription>Altere nome e cor de fundo</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome</Label>
              <Input
                id="edit-name"
                value={editColumnName}
                onChange={(e) => setEditColumnName(e.target.value)}
                placeholder="Nome da coluna"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-color">Cor de fundo</Label>
              <Input
                id="edit-color"
                type="color"
                value={editColumnColor}
                onChange={(e) => setEditColumnColor(e.target.value)}
                className="w-20 h-12 border-2 border-border rounded-md cursor-pointer hover:border-primary"
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={deleteColumn} 
              disabled={!editingColumnKey || columns[editingColumnKey!]?.items.length > 0}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Deletar (vazia)
            </Button>
            <Button onClick={saveEditColumn} disabled={!editColumnName.trim()}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Container cols */}
      <div 
        className="flex gap-4 overflow-x-auto overflow-y-hidden pb-12 snap-x snap-mandatory scrollbar scrollbar-thumb-muted-foreground/80 scrollbar-track-transparent/50 [&::-webkit-scrollbar]:h-3.5 [&::-webkit-scrollbar-thumb]:rounded-full scroll-smooth h-full"
        style={{ 
          scrollbarWidth: 'thin', 
          scrollbarColor: 'rgb(148 163 184 / 0.8) transparent' 
        }}
      >
        {Object.entries(columns).map(([key, column]) => (
          <Card 
            key={key} 
            className="w-56 md:w-64 lg:w-72 xl:w-80 flex-shrink-0 min-h-[500px] snap-center flex flex-col overflow-hidden shadow-2xl border-0 relative"
            style={{ backgroundColor: column.color }}
          >
            <CardContent 
              className="p-6 h-full flex flex-col text-white"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, key)}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold capitalize text-xl tracking-tight drop-shadow-lg flex-1">
                  {key.replace(/^\w/, (c) => c.toUpperCase())}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 ml-2 text-white/80 hover:text-white hover:bg-white/20"
                  onClick={() => openEditColumn(key)}
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 space-y-3 overflow-y-auto pb-4 scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent/20 [&::-webkit-scrollbar]:w-2">
                {column.items.map((item) => (
                  <Card
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item.id)}
                    className="p-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 cursor-grab active:cursor-grabbing active:scale-[0.98] transition-all duration-200 shadow-lg border border-white/20 text-white hover:border-white/40 hover:shadow-xl"
                  >
                    <div className="font-semibold text-base leading-tight">{item.title}</div>
                  </Card>
                ))}
              </div>
              
              {column.items.length === 0 && (
                <div className="flex-1 flex items-center justify-center text-white/70 text-lg font-medium">
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