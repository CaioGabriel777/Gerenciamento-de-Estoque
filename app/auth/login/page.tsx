"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff} from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const { signIn, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const loading = authLoading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // validação mínima
    if (!email) {
      setError("Informe nome e e-mail (senha é irrelevante no fake).");
      return;
    }

    try {
      await signIn({ name, email });
      // signIn já redireciona
    } catch (err: any) {
      setError(err?.message ?? "Erro ao efetuar login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="">Entrar</CardTitle>
        </CardHeader>

        <CardContent>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* <div>
              <Label htmlFor="name" className="mb-4">Nome</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div> */}

            <div>
              <Label htmlFor="email" className="mb-4">E-mail</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <Label htmlFor="password" className="mb-4">Senha</Label>
              <div className="relative">
                <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2 top-2 p-1">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" checked={remember} onCheckedChange={(v) => setRemember(!!v)} />
                <Label htmlFor="remember" className="text-sm">Lembrar-me</Label>
              </div>
              <a href="#" className="text-sm underline">Esqueci a senha</a>
            </div>

            <div className="flex items-center justify-center">
              <Link href="/auth/signup" className="text-sm underline">Não tem conta? Cadastre-se</Link>
            </div>

            {error && (
              <Alert className="mb-4 border-red-500 text-red-200" role="alert">
                <AlertTitle>Erro</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
