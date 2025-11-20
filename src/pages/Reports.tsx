"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const reportsData = [
  { id: 1, periodo: "01/10 - 07/10", conversas: 150, clientes: 45, atendentes: "João, Maria" },
  // Mais dados...
];

const Reports = () => {
  const exportCSV = () => {
    const csv = "Periodo,Conversas,Clientes\n" + reportsData.map(r => `${r.periodo},${r.conversas},${r.clientes}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "relatorios.csv";
    a.click();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Relatórios</CardTitle>
          <Button onClick={exportCSV}>
            <Download className="mr-2 h-4 w-4" /> Exportar CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Período</TableHead>
              <TableHead>Conversas</TableHead>
              <TableHead>Clientes</TableHead>
              <TableHead>Atendentes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportsData.map(report => (
              <TableRow key={report.id}>
                <TableCell>{report.periodo}</TableCell>
                <TableCell>{report.conversas}</TableCell>
                <TableCell>{report.clientes}</TableCell>
                <TableCell>{report.atendentes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default Reports;