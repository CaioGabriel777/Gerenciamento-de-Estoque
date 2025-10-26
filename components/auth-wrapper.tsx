"use client";

import { useAuth } from "@/contexts/auth-context";
import { AppShell } from "@/components/app-shell";
import LoginPage from "@/app/login/page";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();

  if (!user) {
    // não logado → mostra a página de login
    return <LoginPage />;
  }

  // logado → mostra o painel normalmente
  return <AppShell>{children}</AppShell>;
}
