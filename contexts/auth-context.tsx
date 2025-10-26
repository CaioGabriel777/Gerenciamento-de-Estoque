"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  // token é só fake aqui
  token?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (u: { name: string; email: string }) => Promise<void>;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "fake_auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // tenta recuperar user do localStorage
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null;
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const signIn = async ({ name, email }: { name: string; email: string }) => {
    // simula requisição
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));

    const fakeUser: User = {
      id: String(Math.floor(Math.random() * 100000)),
      name: name || email.split("@")[0],
      email,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || email)}&background=random`,
      token: "fake-jwt-token",
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser));
    setUser(fakeUser);
    setLoading(false);
    // opcional: redireciona pro dashboard
    router.push("/");
  };

  const signOut = () => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    // redireciona pra login
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
