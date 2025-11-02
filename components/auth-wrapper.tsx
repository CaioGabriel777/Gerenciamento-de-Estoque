"use client";

import { useAuth } from "@/contexts/auth-context";
import { AppShell } from "@/components/app-shell";
import LoginPage from "@/app/auth/login/page";
import SignupPage from "@/app/auth/signup/page";
import { usePathname } from "next/navigation";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

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

  // Se for rota pública, deixa passar
  if (pathname === "/auth/login") {
    return <LoginPage />;
  }

  if (pathname === "/auth/signup") {
    return <SignupPage />;
  }

  // Se não estiver logado, força login
  if (!user) {
    return <LoginPage />;
  }

  // Logado → mostra o painel
  return <AppShell>{children}</AppShell>;
}
