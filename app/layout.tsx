import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ProductsProvider } from "@/contexts/products-context";
import { AppShell } from "@/components/app-shell"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Estudo React e Next.js",
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ProductsProvider>
            <AppShell>
              {children}
            </AppShell>
          </ProductsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
