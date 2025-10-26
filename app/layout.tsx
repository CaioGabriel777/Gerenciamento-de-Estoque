import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ProductsProvider } from "@/contexts/products-context";
import { AppShell } from "@/components/app-shell"; 
import { AuthProvider } from "@/contexts/auth-context";
import { AuthWrapper } from "@/components/auth-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gerenciamento de Estoque",
  description: "Projeto para praticar estudos com React e Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-background">
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ProductsProvider>
              <AuthWrapper>
                {children}
              </AuthWrapper>
            </ProductsProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
