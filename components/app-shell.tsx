"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Home, Package, PackagePlus, ChevronLeft, ChevronRight, User, Settings, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AvatarMenu } from "./avatar-menu";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Sidebar está expandida se não estiver colapsada OU se estiver em hover
  const isExpanded = !collapsed || isHovering;

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full relative">
        {/* SIDEBAR */}
        <div
          onMouseEnter={() => collapsed && setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          className="relative"
        >
          <Sidebar 
            collapsible="none"
            className={`transition-all duration-300 ${
              isExpanded ? "w-64" : "w-16"
            }`}
          >
            <SidebarHeader className={`p-4 transition-all duration-300 ${isExpanded ? "border-b" : ""}`}>
              {isExpanded ? (
                <div className="flex items-center gap-2 transition-all duration-300">
                  <Package className="h-6 w-6 flex-shrink-0" />
                  <span className="font-semibold text-lg whitespace-nowrap">Meu Painel</span>
                </div>
              ) : (
                <div className="h-8" />
              )}
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup>
                {isExpanded && (
                  <SidebarGroupLabel className="transition-opacity duration-300">
                    Menu
                  </SidebarGroupLabel>
                )}
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Home">
                        <a href="/" className="flex items-center gap-3">
                          <Home className="h-5 w-5 flex-shrink-0" />
                          {isExpanded && <span className="transition-opacity duration-300">Home</span>}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarSeparator className={`my-2 transition-opacity duration-300 ${isExpanded ? "opacity-100" : "opacity-0"}`} />

                    <SidebarMenuItem>
                      {isExpanded && (
                        <SidebarGroupLabel className="transition-opacity duration-300">
                          Produtos
                        </SidebarGroupLabel>
                      )}
                      <SidebarMenuButton asChild tooltip="Lista de Produtos">
                        <a href="/lista-de-produtos" className="flex items-center gap-3">
                          <Package className="h-5 w-5 flex-shrink-0" />
                          {isExpanded && (
                            <span className="transition-opacity duration-300 whitespace-nowrap">
                              Lista de Produtos
                            </span>
                          )}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton asChild tooltip="Cadastro de Produtos">
                        <a href="/cadastro-de-produtos" className="flex items-center gap-3">
                          <PackagePlus className="h-5 w-5 flex-shrink-0" />
                          {isExpanded && (
                            <span className="transition-opacity duration-300 whitespace-nowrap">
                              Cadastro de Produtos
                            </span>
                          )}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter className={`p-4 transition-all duration-300 ${isExpanded ? "border-t" : ""}`}>
              {isExpanded && (
                <div className="text-sm text-muted-foreground transition-opacity duration-300">
                  © 2025 Meu App
                </div>
              )}
            </SidebarFooter>
          </Sidebar>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-30">
            <div className="flex h-16 items-center justify-between px-6">
              {/* BOTÃO DE COLAPSAR/EXPANDIR */}
              <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-2 rounded-md hover:bg-muted transition-colors"
                aria-label={collapsed ? "Expandir sidebar" : "Colapsar sidebar"}
              >
                {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
              </button>

              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">Gestão de Estoque</h1>
              </div>

              <div className="flex items-center gap-2">

                <ThemeToggle />

                <AvatarMenu/>
                
              </div>
            </div>
          </div>

          <main className="p-6 flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}