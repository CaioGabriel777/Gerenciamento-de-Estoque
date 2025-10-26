"use client";

import { useState, useEffect } from "react";
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
import { Home, Package, PackagePlus, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { AvatarMenu } from "./avatar-menu";

export function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar se é mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Sidebar está expandida se não estiver colapsada OU se estiver em hover (apenas desktop)
  const isExpanded = !collapsed || (!isMobile && isHovering);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full relative">
        
        {/* OVERLAY para mobile */}
        {isMobile && !collapsed && (
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setCollapsed(true)}
          />
        )}

        {/* SIDEBAR */}
        <div
          onMouseEnter={() => !isMobile && collapsed && setIsHovering(true)}
          onMouseLeave={() => !isMobile && setIsHovering(false)}
          className={`${isMobile ? 'fixed left-0 top-0 h-full z-50' : 'relative'} transition-transform duration-300 ${
            isMobile && collapsed ? '-translate-x-full' : 'translate-x-0'
          }`}
        >
          <Sidebar 
            collapsible="none"
            className={`transition-all duration-300 h-full ${
              isMobile ? 'w-full' : (isExpanded ? 'w-64' : 'w-16')
            }`}
          >
            <SidebarHeader className={`p-4 transition-all duration-300 ${isExpanded ? "border-b" : ""}`}>
              {isExpanded ? (
                <div className="flex items-center justify-between gap-2 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <Package className="h-6 w-6 flex-shrink-0" />
                    <span className="font-semibold text-lg whitespace-nowrap">Meu Painel</span>
                  </div>
                  {isMobile && (
                    <button
                      onClick={() => setCollapsed(true)}
                      className="p-2 rounded-md hover:bg-muted transition-colors"
                      aria-label="Fechar sidebar"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
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
                        <a 
                          href="/" 
                          className="flex items-center gap-3"
                          onClick={() => isMobile && setCollapsed(true)}
                        >
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
                        <a 
                          href="/lista-de-produtos" 
                          className="flex items-center gap-3"
                          onClick={() => isMobile && setCollapsed(true)}
                        >
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
                        <a 
                          href="/cadastro-de-produtos" 
                          className="flex items-center gap-3"
                          onClick={() => isMobile && setCollapsed(true)}
                        >
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
                {collapsed ? (isMobile ? <Menu className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />) : <ChevronLeft className="h-5 w-5" />}
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