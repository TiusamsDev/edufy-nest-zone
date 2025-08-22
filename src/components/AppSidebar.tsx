import React from "react";
import { 
  Image, 
  Video, 
  FileText, 
  Mic, 
  Palette, 
  Bot, 
  PenTool,
  Home,
  Play,
  Layout,
  Search,
  Calendar,
  BarChart3,
  Lightbulb,
  MessageCircle,
  Users,
  HeartHandshake,
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

// Seção Produção (Azul)
const productionTools = [
  { 
    title: "Criar Imagem", 
    url: "/create-image", 
    icon: Image,
    description: "Gere imagens com IA"
  },
  { 
    title: "Criar Vídeo", 
    url: "/create-video", 
    icon: Video,
    description: "Crie vídeos automaticamente"
  },
  { 
    title: "Criar Roteiro", 
    url: "/create-script", 
    icon: FileText,
    description: "Roteiros para vídeos e conteúdo"
  },
  { 
    title: "Narração IA", 
    url: "/ai-voice", 
    icon: Mic,
    description: "Voz artificial para seus vídeos"
  }
];

// Seção Identidade Visual (Roxo)
const brandingTools = [
  { 
    title: "Identidade Visual", 
    url: "/brand-identity", 
    icon: Palette,
    description: "Logos, cores, identidade do canal"
  },
  { 
    title: "Thumbnails", 
    url: "/thumbnails", 
    icon: PenTool,
    description: "Miniaturas chamativas"
  },
  { 
    title: "Templates", 
    url: "/templates", 
    icon: Layout,
    description: "Intros, overlays, lower thirds"
  }
];

// Seção Crescimento (Verde)
const growthTools = [
  { 
    title: "SEO e Palavras-chave", 
    url: "/seo-keywords", 
    icon: Search,
    description: "Títulos, descrições e tags otimizadas"
  },
  { 
    title: "Agenda de Postagem", 
    url: "/posting-schedule", 
    icon: Calendar,
    description: "Calendário para planejar vídeos"
  },
  { 
    title: "Monitor de Desempenho", 
    url: "/performance-monitor", 
    icon: BarChart3,
    description: "Métricas de views, inscritos e retenção"
  },
  { 
    title: "Ideias de Conteúdo", 
    url: "/content-ideas", 
    icon: Lightbulb,
    description: "Gerador de tópicos e tendências"
  }
];

// Seção Suporte e Comunidade (Laranja)
const supportTools = [
  { 
    title: "Assistente IA", 
    url: "/ai-assistant", 
    icon: Bot,
    description: "Chat para dúvidas e ideias"
  },
  { 
    title: "Fórum / Comunidade", 
    url: "/community", 
    icon: MessageCircle,
    description: "Troca de ideias entre alunos"
  },
  { 
    title: "Mentorias / Suporte", 
    url: "/mentoring", 
    icon: HeartHandshake,
    description: "Suporte personalizado"
  }
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

  const renderSection = (
    items: typeof productionTools,
    title: string,
    icon: any,
    colorClass: string
  ) => (
    <SidebarGroup className="mb-6">
      <SidebarGroupLabel className={`font-semibold mb-3 px-3 py-2 rounded-lg ${colorClass} flex items-center gap-2`}>
        {React.createElement(icon, { className: "w-4 h-4" })}
        {!isCollapsed && title}
      </SidebarGroupLabel>
      
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                onClick={() => handleToolClick(item.url)}
                className={`group relative overflow-hidden transition-all duration-200 rounded-lg mx-1 ${
                  isActive(item.url) 
                    ? 'bg-primary/15 text-primary border border-primary/30 shadow-sm' 
                    : 'hover:bg-accent/60 hover:shadow-sm'
                }`}
                tooltip={isCollapsed ? item.title : undefined}
              >
                <item.icon className={`w-4 h-4 transition-colors ${
                  isActive(item.url) ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                }`} />
                {!isCollapsed && (
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-sm text-foreground">{item.title}</span>
                    <span className="text-xs text-muted-foreground leading-tight">{item.description}</span>
                  </div>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar className="border-r border-border/50 bg-card/50 backdrop-blur-xl">
      <SidebarContent className="p-3">
        {/* Dashboard */}
        <SidebarGroup className="mb-6">
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleToolClick(item.url)}
                    className={`group relative overflow-hidden transition-all duration-200 rounded-lg mb-2 ${
                      isActive(item.url) 
                        ? 'bg-primary/15 text-primary border border-primary/30 shadow-sm' 
                        : 'hover:bg-accent/60 hover:shadow-sm'
                    }`}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <item.icon className={`w-5 h-5 transition-colors ${
                      isActive(item.url) ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                    }`} />
                    {!isCollapsed && (
                      <div className="flex flex-col items-start">
                        <span className="font-semibold text-foreground">{item.title}</span>
                        <span className="text-xs text-muted-foreground">{item.description}</span>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && <div className="h-px bg-border mx-3 mb-6" />}

        {/* Seções organizadas com cores */}
        {renderSection(productionTools, "Produção", Play, "bg-blue-500/10 text-blue-700 dark:text-blue-300")}
        {renderSection(brandingTools, "Identidade Visual", Palette, "bg-purple-500/10 text-purple-700 dark:text-purple-300")}
        {renderSection(growthTools, "Crescimento", BarChart3, "bg-green-500/10 text-green-700 dark:text-green-300")}
        {renderSection(supportTools, "Suporte e Comunidade", Users, "bg-orange-500/10 text-orange-700 dark:text-orange-300")}
      </SidebarContent>
    </Sidebar>
  );
}