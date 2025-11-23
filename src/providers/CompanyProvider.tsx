"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthProvider';

export interface Company {
  id: string;
  nome_fantasia: string;
  cnpj: string;
  plano_id: string;
  whatsapp_sessions?: { status: string }[];
}

interface CompanyContextType {
  companies: Company[] | undefined;
  selectedCompany: Company | null;
  setSelectedCompanyId: (id: string | null) => void;
  isLoading: boolean;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const [selectedId, setSelectedIdInternal] = useState<string | null>(null);

  const { data: companies, isLoading } = useQuery<Company[]>({
    queryKey: ['user-companies', session?.user.id],
    queryFn: async () => {
      if (!session?.user.id) return [];
      const { data, error } = await supabase.rpc('get_client_companies', {
        client_user_id: session.user.id
      });
      if (error) throw error;
      return data || [];
    },
    enabled: !!session?.user.id,
  });

  const selectedCompany = companies?.find(c => c.id === selectedId) || companies?.[0] || null;

  useEffect(() => {
    const stored = localStorage.getItem('selectedCompanyId');
    if (stored && companies?.some(c => c.id === stored)) {
      setSelectedIdInternal(stored);
    } else if (companies?.[0]) {
      setSelectedIdInternal(companies[0].id);
    }
  }, [companies]);

  useEffect(() => {
    if (selectedCompany?.id) {
      localStorage.setItem('selectedCompanyId', selectedCompany.id);
    }
  }, [selectedCompany?.id]);

  const setSelectedCompanyId = (id: string | null) => {
    setSelectedIdInternal(id);
  };

  return (
    <CompanyContext.Provider value={{
      companies,
      selectedCompany,
      setSelectedCompanyId,
      isLoading,
    }}>
      {children}
    </CompanyContext.Provider>
  );
}

export const useCompany = () => {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within CompanyProvider');
  }
  return context;
};