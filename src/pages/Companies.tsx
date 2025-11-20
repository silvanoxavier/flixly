"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { QrCode } from "lucide-react";

const companiesData = [
  { id: 1, name: "Empresa A", cnpj: "12.345.678/0001-90", status: "Conectada", instance: "inst1" },
];

const Companies = () => (
  <Card>
    <CardHeader>
      <CardTitle>Empresas</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>CNPJ</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Instância</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companiesData.map(c => (
            <TableRow key={c.id}>
              <TableCell>{c.name}</TableCell>
              <TableCell>{c.cnpj}</TableCell>
              <TableCell>
                <Badge variant={c.status === "Conectada" ? "default" : "secondary"}>{c.status}</Badge>
              </TableCell>
              <TableCell>{c.instance}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm"><QrCode className="mr-1 h-4 w-4" /> QR Code</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default Companies;