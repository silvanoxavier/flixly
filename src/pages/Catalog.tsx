"use client";

import { useOutletContext } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, ShoppingCart, Image as ImageIcon, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { showError } from '@/utils/toast';

interface Company {
  id: string;
  nome_fantasia: string; // Adicionado
  name: string;
  instance: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  category?: string;
  stock?: number;
}

export default function Catalog() {
  // Acessa o contexto de forma segura
  const context = useOutletContext<{ company: Company | null }>();
  const company = context?.company; // Acesso seguro com optional chaining
  const companyId = company?.id;

  const { data: products, isLoading, error, refetch } = useQuery<Product[]>({
    queryKey: ['catalog-products', companyId],
    queryFn: async () => {
      if (!companyId) throw new Error('Sem company_id');
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('company_id', companyId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    },
    enabled: !!companyId, // Habilita a query apenas se companyId existir
  });

  // Renderiza um skeleton se a empresa não estiver carregada ou se os dados estiverem carregando
  if (!company || isLoading) {
    return (
      <div className="space-y-6 w-full max-w-7xl mx-auto h-full">
        <Skeleton className="h-8 w-64 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-80 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    showError('Erro ao carregar catálogo');
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Package className="h-12 w-12 text-destructive" />
        <Button onClick={() => refetch()}>Tentar novamente</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catálogo WhatsApp Business</h1>
          <p className="text-muted-foreground">Produtos da {company?.nome_fantasia} (Supabase realtime).</p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Package className="h-4 w-4" />
          {products?.length || 0} produtos
        </Badge>
      </div>

      {products?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4 text-center">
          <Package className="h-12 w-12 text-muted-foreground" />
          <h3 className="text-xl font-semibold">Nenhum produto</h3>
          <p>Adicione via Admin ou API.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
              <CardHeader className="p-0 h-48 relative overflow-hidden bg-gradient-to-br from-muted to-background">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : <ImageIcon className="h-12 w-12 text-muted-foreground absolute inset-0 m-auto" />}
              </CardHeader>
              <CardContent className="p-6 pt-0 pb-2 flex-1">
                {product.category && <Badge variant="secondary" className="mb-3 w-fit">{product.category}</Badge>}
                <CardTitle className="font-bold text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors mb-2">{product.name}</CardTitle>
                <CardDescription className="text-sm line-clamp-2 mb-4">{product.description || 'Sem descrição'}</CardDescription>
                <div className="flex items-end justify-between">
                  <div className="flex items-baseline gap-1 mb-2">
                    <DollarSign className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-2xl font-bold text-primary">R$ {product.price.toFixed(2).replace('.', ',')}</span>
                  </div>
                  {product.stock !== undefined && (
                    <Badge variant={product.stock > 0 ? "default" : "destructive"}>{product.stock > 0 ? `${product.stock} und` : 'Esgotado'}</Badge>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 pb-6">
                <div className="flex w-full gap-2">
                  <Button variant="outline" size="sm" className="flex-1">Editar</Button>
                  <Button size="sm" className="flex-1 flex items-center gap-1"> <ShoppingCart className="h-4 w-4" /> Enviar WA</Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}