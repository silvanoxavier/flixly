"use client";

import { Card, CardContent } from "@/components/ui/card";

const columns = {
  novo: [{ id: 1, title: "Pedido #123" }],
  preparo: [{ id: 2, title: "Pedido #124" }],
  entrega: [],
  finalizado: [{ id: 3, title: "Pedido #122" }],
};

const Kanban = () => (
  <div className="flex space-x-4 overflow-x-auto p-4">
    {Object.entries(columns).map(([key, items]) => (
      <Card key={key} className="w-64 flex-shrink-0">
        <CardContent className="p-4">
          <h3 className="font-bold capitalize mb-4">{key.replace('_', ' ')}</h3>
          {items.map(item => (
            <Card key={item.id} className="mb-2 p-3 bg-muted">
              {item.title}
            </Card>
          ))}
        </CardContent>
      </Card>
    ))}
  </div>
);

export default Kanban;