"use client";

import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { showSuccess, showError } from '@/utils/toast';

interface Company { id: string; name: string; instance: string; }
interface Order { id: string; title: string; status: string; company_id: string; }

export default function Kanban() {
  const { company } = useOutletContext<{ company: Company }>();
  const companyId = company?.id;
  const queryClient = useQueryClient();

  const { data: orders = [], isLoading } = useQuery<Order[]>({
    queryKey: ['orders', companyId],
    queryFn: async () => {
      if (!companyId) return [];
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!companyId,
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from('orders')
        .update({ status })
        .eq('id', id)
        .eq('company_id', companyId!);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      showSuccess('Pedido movido!');
    },
    onError: (err) => showError(err.message),
  });

  const [columns, setColumns] = useState<Record<string, Order[]>>({});
  const [showNewCard, setShowNewCard] = useState(false);
  const [newCardTitle, setNewCardTitle] = useState("");

  useEffect(() => {
    const cols: Record<string, Order[]> = {};
    const statuses = ['novo', 'preparo', 'entrega', 'finalizado'];
    statuses.forEach(status => {
      cols[status] = orders.filter(order => order.status === status);
    });
    setColumns(cols);
  }, [orders]);

  const addNewCard = async () => {
    if (!newCardTitle.trim() || !companyId) return;
    const { error } = await supabase
      .from('orders')
      .insert({ company_id: companyId, title: newCardTitle.trim(), status: 'novo' });
    if (error) {
      showError(error.message);
      return;
    }
    showSuccess('Pedido criado!');
    setNewCardTitle('');
    setShowNewCard(false);
    queryClient.invalidateQueries({ queryKey: ['orders'] });
  };

  const moveItem = (orderId: string, targetStatus: string) => {
    updateOrderMutation.mutate({ id: orderId, status: targetStatus });
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    e.dataTransfer.setData("text/plain", id);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, columnKey: string) => {
    const id = e.dataTransfer.getData("text/plain");
    moveItem(id, columnKey);
  };

  if (isLoading) return <div>Carregando pedidos...</div>;

  return (
    <div className="space-y-6 w-full h-full p-4 md:p-6">
      <Dialog open={showNewCard} onOpenChange={setShowNewCard}>
        <DialogTrigger asChild>
          <Button><Plus className="mr-2 h-4 w-4" /> Novo Pedido</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Novo Pedido</DialogTitle>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="card-title">Título</Label>
            <Input id="card-title" value={newCardTitle} onChange={(e) => setNewCardTitle(e.target.value)} />
          </div>
          <DialogFooter>
            <Button onClick={addNewCard} disabled={!newCardTitle.trim()}>Criar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex gap-4 overflow-x-auto pb-12 h-full">
        {Object.entries(columns).map(([status, items]) => (
          <Card key={status} className="w-72 flex-shrink-0 min-h-[500px]" style={{ backgroundColor: status === 'novo' ? '#ef4444' : status === 'preparo' ? '#f59e0b' : status === 'entrega' ? '#10b981' : '#3b82f6' }}>
            <CardContent className="p-6 h-full flex flex-col text-white" onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, status)}>
              <h3 className="font-bold text-xl mb-6 capitalize">{status.replace('_', ' ')}</h3>
              <div className="flex-1 space-y-3 overflow-y-auto">
                {items.map((order) => (
                  <Card key={order.id} draggable onDragStart={(e) => handleDragStart(e, order.id)}
                    className="p-4 bg-white/10 cursor-grab hover:bg-white/20 shadow-lg border-white/20 text-white">
                    {order.title}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}