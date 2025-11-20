"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const customersData = [
  { id: 1, name: "João Silva", phone: "(11) 99999-9999", tags: ["VIP"], lastChat: "Hoje" },
];

const Customers = () => (
  <Card>
    <CardHeader>
      <CardTitle>Clientes</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead>Último Chat</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customersData.map((c) => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.phone}</TableCell>
              <TableCell>{c.tags.map((t) => <Badge key={t}>{t}</Badge>)}</TableCell>
              <TableCell>{c.lastChat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default Customers;