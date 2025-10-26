"use client";

import { useAuth } from "@/contexts/auth-context";
import { AppShell } from "@/components/app-shell";
import LoginPage from "@/app/login/page";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth(); // ← adicione o loading aqui

  // Enquanto está carregando, mostra um spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // não logado → mostra a página de login
    return <LoginPage />;
  }

  // logado → mostra o painel normalmente
  return <AppShell>{children}</AppShell>;
}