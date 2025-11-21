"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit, Trash2, Building2, Briefcase, Lock } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { showSuccess, showError } from "@/utils/toast";

// --- Mock Data ---
interface Department {
  id: string;
  name: string;
}

interface Role {
  id: string;
  name: string;
  departmentId: string;
  permissions: string[];
}

interface Permission {
  id: string;
  name: string;
  description: string;
}

const mockDepartments: Department[] = [
  { id: "dpt1", name: "Vendas" },
  { id: "dpt2", name: "Marketing" },
  { id: "dpt3", name: "Suporte" },
];

const mockPermissions: Permission[] = [
  { id: "perm_view_dashboard", name: "Ver Dashboard", description: "Permite visualizar o painel principal." },
  { id: "perm_manage_customers", name: "Gerenciar Clientes", description: "Permite adicionar, editar e excluir clientes." },
  { id: "perm_manage_channels", name: "Gerenciar Canais", description: "Permite configurar e gerenciar canais de comunicação." },
  { id: "perm_send_messages", name: "Enviar Mensagens", description: "Permite enviar mensagens através dos canais." },
  { id: "perm_view_reports", name: "Ver Relatórios", description: "Permite acessar e visualizar relatórios." },
  { id: "perm_manage_catalog", name: "Gerenciar Catálogo", description: "Permite adicionar, editar e excluir produtos do catálogo." },
  { id: "perm_manage_automations", name: "Gerenciar Automações", description: "Permite criar e gerenciar automações." },
  { id: "perm_manage_kanban", name: "Gerenciar Kanban", description: "Permite gerenciar o quadro Kanban." },
  { id: "perm_manage_schedule", name: "Gerenciar Agendamento", description: "Permite criar e gerenciar agendamentos." },
  { id: "perm_admin_settings", name: "Configurações Admin", description: "Acesso total às configurações de administração." },
];

const mockRoles: Role[] = [
  { id: "role1", name: "Gerente de Vendas", departmentId: "dpt1", permissions: ["perm_view_dashboard", "perm_manage_customers", "perm_send_messages", "perm_view_reports"] },
  { id: "role2", name: "Atendente de Suporte", departmentId: "dpt3", permissions: ["perm_manage_customers", "perm_send_messages"] },
  { id: "role3", name: "Analista de Marketing", departmentId: "dpt2", permissions: ["perm_view_dashboard", "perm_view_reports", "perm_manage_automations"] },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState("departments");

  // --- Departamentos ---
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [isDeptModalOpen, setIsDeptModalOpen] = useState(false);
  const [currentDept, setCurrentDept] = useState<Department | null>(null);
  const [deptName, setDeptName] = useState("");

  const handleSaveDepartment = () => {
    if (!deptName.trim()) {
      showError("O nome do departamento é obrigatório.");
      return;
    }
    if (currentDept) {
      setDepartments(prev => prev.map(d => d.id === currentDept.id ? { ...d, name: deptName } : d));
      showSuccess("Departamento atualizado com sucesso!");
    } else {
      setDepartments(prev => [...prev, { id: String(Date.now()), name: deptName }]);
      showSuccess("Departamento criado com sucesso!");
    }
    setDeptName("");
    setCurrentDept(null);
    setIsDeptModalOpen(false);
  };

  const handleDeleteDepartment = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este departamento?")) {
      setDepartments(prev => prev.filter(d => d.id !== id));
      showSuccess("Departamento excluído com sucesso!");
    }
  };

  // --- Cargos ---
  const [roles, setRoles] = useState<Role[]>(mockRoles);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [roleName, setRoleName] = useState("");
  const [roleDepartmentId, setRoleDepartmentId] = useState(departments[0]?.id || "");
  const [rolePermissions, setRolePermissions] = useState<string[]>([]);

  const handleSaveRole = () => {
    if (!roleName.trim() || !roleDepartmentId) {
      showError("Nome do cargo e departamento são obrigatórios.");
      return;
    }
    if (currentRole) {
      setRoles(prev => prev.map(r => r.id === currentRole.id ? { ...r, name: roleName, departmentId: roleDepartmentId, permissions: rolePermissions } : r));
      showSuccess("Cargo atualizado com sucesso!");
    } else {
      setRoles(prev => [...prev, { id: String(Date.now()), name: roleName, departmentId: roleDepartmentId, permissions: rolePermissions }]);
      showSuccess("Cargo criado com sucesso!");
    }
    setRoleName("");
    setRoleDepartmentId(departments[0]?.id || "");
    setRolePermissions([]);
    setCurrentRole(null);
    setIsRoleModalOpen(false);
  };

  const handleDeleteRole = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este cargo?")) {
      setRoles(prev => prev.filter(r => r.id !== id));
      showSuccess("Cargo excluído com sucesso!");
    }
  };

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    setRolePermissions(prev =>
      checked ? [...prev, permissionId] : prev.filter(id => id !== permissionId)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <Lock className="h-7 w-7 text-primary" /> Administração
        </h1>
        <p className="text-muted-foreground">Gerencie departamentos, cargos e permissões da sua empresa.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="departments">
            <Building2 className="h-4 w-4 mr-2" /> Departamentos
          </TabsTrigger>
          <TabsTrigger value="roles">
            <Briefcase className="h-4 w-4 mr-2" /> Cargos
          </TabsTrigger>
          <TabsTrigger value="permissions">
            <Lock className="h-4 w-4 mr-2" /> Permissões
          </TabsTrigger>
        </TabsList>

        {/* --- Aba Departamentos --- */}
        <TabsContent value="departments" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Departamentos</CardTitle>
              <Dialog open={isDeptModalOpen} onOpenChange={setIsDeptModalOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { setCurrentDept(null); setDeptName(""); }}>
                    <Plus className="h-4 w-4 mr-2" /> Novo Departamento
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{currentDept ? "Editar Departamento" : "Novo Departamento"}</DialogTitle>
                    <DialogDescription>
                      {currentDept ? "Altere o nome do departamento." : "Crie um novo departamento para organizar sua equipe."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-2">
                    <Label htmlFor="dept-name">Nome do Departamento</Label>
                    <Input
                      id="dept-name"
                      value={deptName}
                      onChange={(e) => setDeptName(e.target.value)}
                      placeholder="Ex: Vendas, Marketing, Suporte"
                      required
                    />
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleSaveDepartment}>
                      {currentDept ? "Salvar Alterações" : "Criar Departamento"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departments.map((dept) => (
                    <TableRow key={dept.id}>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mr-2"
                          onClick={() => {
                            setCurrentDept(dept);
                            setDeptName(dept.name);
                            setIsDeptModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteDepartment(dept.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Aba Cargos --- */}
        <TabsContent value="roles" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Cargos</CardTitle>
              <Dialog open={isRoleModalOpen} onOpenChange={setIsRoleModalOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { setCurrentRole(null); setRoleName(""); setRoleDepartmentId(departments[0]?.id || ""); setRolePermissions([]); }}>
                    <Plus className="h-4 w-4 mr-2" /> Novo Cargo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{currentRole ? "Editar Cargo" : "Novo Cargo"}</DialogTitle>
                    <DialogDescription>
                      {currentRole ? "Altere os detalhes do cargo e suas permissões." : "Crie um novo cargo e defina suas permissões."}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="role-name">Nome do Cargo</Label>
                      <Input
                        id="role-name"
                        value={roleName}
                        onChange={(e) => setRoleName(e.target.value)}
                        placeholder="Ex: Vendedor, Suporte N1"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role-department">Departamento</Label>
                      <Select value={roleDepartmentId} onValueChange={setRoleDepartmentId}>
                        <SelectTrigger id="role-department">
                          <SelectValue placeholder="Selecione um departamento" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Permissões</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto p-2 border rounded-md">
                      {mockPermissions.map(perm => (
                        <div key={perm.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={`perm-${perm.id}`}
                            checked={rolePermissions.includes(perm.id)}
                            onCheckedChange={(checked) => handlePermissionChange(perm.id, !!checked)}
                          />
                          <Label htmlFor={`perm-${perm.id}`} className="flex flex-col">
                            <span className="font-medium">{perm.name}</span>
                            <span className="text-xs text-muted-foreground">{perm.description}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleSaveRole}>
                      {currentRole ? "Salvar Alterações" : "Criar Cargo"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cargo</TableHead>
                    <TableHead>Departamento</TableHead>
                    <TableHead>Permissões</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {roles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium">{role.name}</TableCell>
                      <TableCell>{departments.find(d => d.id === role.departmentId)?.name}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {role.permissions.length > 0 ? role.permissions.map(pId => mockPermissions.find(p => p.id === pId)?.name).join(', ') : 'Nenhuma'}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="mr-2"
                          onClick={() => {
                            setCurrentRole(role);
                            setRoleName(role.name);
                            setRoleDepartmentId(role.departmentId);
                            setRolePermissions(role.permissions);
                            setIsRoleModalOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDeleteRole(role.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* --- Aba Permissões (somente visualização/descrição) --- */}
        <TabsContent value="permissions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Permissões Disponíveis</CardTitle>
              <CardDescription>Lista de todas as permissões que podem ser atribuídas aos cargos.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Permissão</TableHead>
                    <TableHead>Descrição</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockPermissions.map((perm) => (
                    <TableRow key={perm.id}>
                      <TableCell className="font-medium">{perm.name}</TableCell>
                      <TableCell className="text-muted-foreground">{perm.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}