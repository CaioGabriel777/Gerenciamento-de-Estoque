"use client";

import { useEffect } from "react";
import { useAuth } from "@/contexts/auth-context";
import { useRouter, usePathname } from "next/navigation";

const PUBLIC_PATHS = ["/auth/login", "/auth/signup"];

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublic = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    if (!loading && !user && !isPublic) {
      router.replace("/auth/login");
    }
  }, [loading, user, router, isPublic]);

  if (!isPublic && (loading || !user)) {
    return <div className="p-6">Carregando...</div>;
  }

  return <>{children}</>;
}
