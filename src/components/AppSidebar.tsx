import { useState } from "react";
import { 
  Image, 
  Video, 
  FileText, 
  Mic, 
  Palette, 
  Sparkles, 
  Bot, 
  PenTool,
  Music,
  Megaphone,
  Home
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { 
    title: "Dashboard", 
    url: "/", 
    icon: Home,
    description: "Página inicial"
  }
];

const aiTools = [
  { 
    title: "Criar Imagem", 
    url: "/create-image", 
    icon: Image,
    description: "Gere imagens com IA",
    gradient: "from-pink-500 to-violet-500"
  },
  { 
    title: "Criar Vídeo", 
    url: "/create-video", 
    icon: Video,
    description: "Crie vídeos automaticamente",
    gradient: "from-blue-500 to-cyan-500"
  },
  { 
    title: "Criar Roteiro", 
    url: "/create-script", 
    icon: FileText,
    description: "Roteiros para vídeos e conteúdo",
    gradient: "from-green-500 to-emerald-500"
  },
  { 
    title: "Narração IA", 
    url: "/ai-voice", 
    icon: Mic,
    description: "Voz artificial para seus vídeos",
    gradient: "from-orange-500 to-red-500"
  },
  { 
    title: "Identidade Visual", 
    url: "/brand-identity", 
    icon: Palette,
    description: "Crie logos e identidade visual",
    gradient: "from-purple-500 to-pink-500"
  },
  { 
    title: "Thumbnails", 
    url: "/thumbnails", 
    icon: PenTool,
    description: "Miniaturas chamativas",
    gradient: "from-yellow-500 to-orange-500"
  },
  { 
    title: "Trilha Sonora", 
    url: "/music-ai", 
    icon: Music,
    description: "Música de fundo personalizada",
    gradient: "from-indigo-500 to-purple-500"
  },
  { 
    title: "Copy para Redes", 
    url: "/social-copy", 
    icon: Megaphone,
    description: "Textos para posts e descrições",
    gradient: "from-teal-500 to-blue-500"
  },
  { 
    title: "Assistente IA", 
    url: "/ai-assistant", 
    icon: Bot,
    description: "Chat para dúvidas e ideias",
    gradient: "from-slate-500 to-gray-500"
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const isCollapsed = state === "collapsed";

  const handleToolClick = (url: string) => {
    navigate(url);
  };

  const isActive = (url: string) => location.pathname === url;

  return (
    <Sidebar className="border-r border-border/50 bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-xl">
      <SidebarContent className="p-2">
        {/* Navegação Principal */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium mb-2 px-2">
            <Home className="w-4 h-4 mr-2" />
            {!isCollapsed && "Navegação"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleToolClick(item.url)}
                    className={`group relative overflow-hidden transition-all duration-300 hover:scale-105 mb-1 ${
                      isActive(item.url) 
                        ? 'bg-primary/20 text-primary border border-primary/30' 
                        : 'hover:bg-accent/50'
                    }`}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className={`w-4 h-4 transition-colors ${
                      isActive(item.url) ? 'text-primary' : 'text-muted-foreground group-hover:text-accent'
                    }`} />
                    {!isCollapsed && (
                      <div className="flex flex-col items-start">
                        <span className="font-medium text-foreground">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Ferramentas IA */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium mb-2 px-2">
            <Sparkles className="w-4 h-4 mr-2" />
            {!isCollapsed && "Ferramentas IA"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {aiTools.map((tool) => (
                <SidebarMenuItem key={tool.title}>
                  <SidebarMenuButton 
                    onClick={() => handleToolClick(tool.url)}
                    className={`group relative overflow-hidden transition-all duration-300 hover:scale-105 mb-1 ${
                      isActive(tool.url) 
                        ? 'bg-primary/20 text-primary border border-primary/30' 
                        : 'hover:bg-accent/50'
                    }`}
                    tooltip={isCollapsed ? tool.title : undefined}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <tool.icon className={`w-4 h-4 transition-colors relative z-10 ${
                      isActive(tool.url) ? 'text-primary' : 'text-muted-foreground group-hover:text-accent'
                    }`} />
                    {!isCollapsed && (
                      <div className="flex flex-col items-start relative z-10">
                        <span className="font-medium text-foreground">{tool.title}</span>
                        <span className="text-xs text-muted-foreground">{tool.description}</span>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}