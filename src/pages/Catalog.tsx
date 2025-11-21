"use client";

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Package, ShoppingCart, Image as ImageIcon, DollarSign } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Camiseta Premium",
    description: "Camiseta 100% algodão, conforto máximo",
    price: 49.90,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "Roupas",
    stock: 50
  },
  {
    id: "2",
    name: "Smartphone Galaxy S23",
    description: "Tela AMOLED 120Hz, câmera 200MP",
    price: 2999.00,
    image: "https://images.unsplash.com/photo-1592899677979-1b1d3cf2a219?w=400&h=400&fit=crop",
    category: "Eletrônicos",
    stock: 25
  },
  {
    id: "3",
    name: "Fone Bluetooth AirPods",
    description: "Som espacial, cancelamento de ruído",
    price: 1299.00,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Acessórios",
    stock: 100
  },
  {
    id: "4",
    name: "Notebook MacBook Air M2",
    description: "Leve e poderoso, 18h bateria",
    price: 8999.00,
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
    category: "Eletrônicos",
    stock: 15
  },
  {
    id: "5",
    name: "Tênis Nike Air Max",
    description: "Conforto e estilo para o dia a dia",
    price: 599.90,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    category: "Calçados",
    stock: 75
  },
  {
    id: "6",
    name: "Relógio Apple Watch Ultra",
    description: "GPS avançado, mergulho até 40m",
    price: 5499.00,
    image: "https://images.unsplash.com/photo-1661963516302-784a4a8cfdbd?w=400&h=400&fit=crop",
    category: "Acessórios",
    stock: 30
  },
];

// Placeholder para Evolution API (substitua por fetch real via Supabase)
const fetchCatalogProducts = async (): Promise<Product[]> => {
  // TODO: Supabase edge function para Evolution API
  // const { data } = await supabase.functions.invoke('evolution-catalog', { instance: 'sua-instancia' });
  // return data.products;
  return new Promise((resolve) => setTimeout(() => resolve(mockProducts), 1000));
};

export default function Catalog() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ['catalog-products'],
    queryFn: fetchCatalogProducts,
  });

  if (error) return (
    <div className="flex flex-col items-center justify-center h-64 space-y-4">
      <Package className="h-12 w-12 text-muted-foreground" />
      <h2 className="text-2xl font-bold">Erro ao carregar catálogo</h2>
      <p className="text-muted-foreground text-center max-w-md">
        Verifique a conexão com Evolution API. Tente novamente.
      </p>
      <Button onClick={() => window.location.reload()}>Recarregar</Button>
    </div>
  );

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catálogo WhatsApp Business</h1>
          <p className="text-muted-foreground">
            Gerencie e envie produtos diretamente no WhatsApp via Evolution API.
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-1">
          <Package className="h-4 w-4" />
          {products?.length || 0} produtos
        </Badge>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-64 w-full rounded-lg" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
              <CardHeader className="p-0 h-48 relative overflow-hidden bg-gradient-to-br from-muted to-background">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    (e.currentTarget.nextSibling as HTMLElement)?.classList.remove('hidden');
                  }}
                />
                <ImageIcon className="hidden h-12 w-12 text-muted-foreground absolute inset-0 m-auto group-hover:hidden" />
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <Badge className="mb-2">{product.category}</Badge>
                <CardTitle className="font-bold text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                <CardDescription className="text-sm line-clamp-2 mt-1">
                  {product.description}
                </CardDescription>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-baseline gap-1">
                    <DollarSign className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold text-primary">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                    {product.stock > 0 ? `${product.stock} em estoque` : 'Esgotado'}
                  </Badge>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0 pb-6 flex justify-between">
                <Button variant="outline" size="sm" className="flex-1 mr-2">
                  Editar
                </Button>
                <Button size="sm" className="flex-1 ml-2 flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Enviar WhatsApp
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}