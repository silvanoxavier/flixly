"use client";

import { useCompany } from '@/providers/CompanyProvider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CompanySelector() {
  const { companies, selectedCompany, setSelectedCompanyId } = useCompany();

  if (!companies || companies.length <= 1) {
    return (
      <Badge variant="secondary" className="flex items-center gap-1">
        <Building2 className="h-4 w-4" />
        {selectedCompany?.nome_fantasia || 'Empresa'}
      </Badge>
    );
  }

  return (
    <Select value={selectedCompany?.id || ''} onValueChange={setSelectedCompanyId}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Selecione empresa" />
      </SelectTrigger>
      <SelectContent>
        {companies.map((company) => (
          <SelectItem key={company.id} value={company.id}>
            {company.nome_fantasia}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}