"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from "react-router-dom";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="font-black text-3xl text-primary-foreground tracking-tight">F</span>
            </div>
          </div>
          <CardTitle className="text-2xl">Bem-vindo ao Flixly</CardTitle>
          <CardDescription>
            Faça login ou crie uma conta para continuar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Registrar</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input id="login-email" type="email" placeholder="seu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="login-password">Senha</Label>
                <Input id="login-password" type="password" placeholder="********" />
              </div>
              <Button className="w-full">Entrar</Button>
              <div className="text-center text-sm text-muted-foreground">
                <Link to="#" className="underline">Esqueceu a senha?</Link>
              </div>
            </TabsContent>
            <TabsContent value="register" className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="register-name">Nome</Label>
                <Input id="register-name" type="text" placeholder="Seu nome completo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-email">Email</Label>
                <Input id="register-email" type="email" placeholder="seu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-password">Senha</Label>
                <Input id="register-password" type="password" placeholder="********" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="register-confirm-password">Confirmar Senha</Label>
                <Input id="register-confirm-password" type="password" placeholder="********" />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Eu aceito os <Link to="#" className="underline">Termos de Serviço</Link> e a <Link to="#" className="underline">Política de Privacidade</Link>.
                </label>
              </div>
              <Button className="w-full">Registrar</Button>
            </TabsContent>
          </Tabs>
          <div className="mt-6 pt-6 border-t border-border">
            <Button asChild variant="outline" className="w-full">
              <Link to="/dashboard">Ir para Dashboard (Teste)</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}