"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const products = [
  { id: 1, name: "Produto 1", price: "R$ 29,90", image: "/placeholder.svg", category: "Eletrônicos" },
  // Mais...
];

const Catalog = () => (
  <div>
    <div className="flex justify-between mb-6">
      <h1 className="text-2xl font-bold">Catálogo</h1>
      <Button><Plus className="mr-2 h-4 w-4" /> Novo Produto</Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(p => (
        <Card key={p.id}>
          <CardHeader>
            <img src={p.image} alt={p.name} className="w-full h-48 object-cover rounded-lg" />
          </CardHeader>
          <CardContent>
            <h3 className="font-bold">{p.name}</h3>
            <p className="text-lg font-semibold mt-1">R$ {p.price}</p>
            <p className="text-sm text-muted-foreground">{p.category}</p>
            <Button className="w-full mt-4">Enviar para Chat</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default Catalog;