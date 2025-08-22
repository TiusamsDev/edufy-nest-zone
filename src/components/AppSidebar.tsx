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
    colorClass: string,
    accentColor: string
  ) => (
    <SidebarGroup className="mb-8">
      <SidebarGroupLabel className={`font-bold text-xs uppercase tracking-wider mb-4 px-4 py-3 rounded-xl ${colorClass} backdrop-blur-sm border border-white/5 flex items-center gap-3 shadow-sm`}>
        <div className={`p-1.5 rounded-lg ${accentColor}`}>
          {React.createElement(icon, { className: "w-3.5 h-3.5" })}
        </div>
        {!isCollapsed && <span className="text-foreground/90">{title}</span>}
      </SidebarGroupLabel>
      
      <SidebarGroupContent>
        <SidebarMenu className="space-y-1.5 px-2">
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                onClick={() => handleToolClick(item.url)}
                className={`group relative overflow-hidden transition-all duration-300 rounded-xl p-3 ${
                  isActive(item.url) 
                    ? `bg-primary/15 text-primary border border-primary/30 shadow-md shadow-primary/10 scale-[1.02]` 
                    : 'hover:bg-card/80 hover:shadow-soft hover:scale-[1.01] hover:border-border/40 border border-transparent'
                }`}
                tooltip={isCollapsed ? item.title : undefined}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    isActive(item.url) 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-muted/50 text-muted-foreground group-hover:bg-accent/20 group-hover:text-accent'
                  }`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  {!isCollapsed && (
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <span className={`font-semibold text-sm transition-colors ${
                        isActive(item.url) ? 'text-primary' : 'text-foreground group-hover:text-accent'
                      }`}>
                        {item.title}
                      </span>
                      <span className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
                        {item.description}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Active indicator */}
                {isActive(item.url) && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full" />
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar className="border-r border-border/30 gradient-surface backdrop-blur-xl shadow-lg">
      <SidebarContent className="p-4 overflow-y-auto">
        {/* Dashboard - Home Section */}
        <SidebarGroup className="mb-8">
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    onClick={() => handleToolClick(item.url)}
                    className={`group relative overflow-hidden transition-all duration-300 rounded-xl p-4 mb-2 ${
                      isActive(item.url) 
                        ? 'bg-primary/15 text-primary border border-primary/30 shadow-lg shadow-primary/20 scale-[1.02]' 
                        : 'hover:bg-card/80 hover:shadow-soft hover:scale-[1.01] border border-transparent hover:border-border/40'
                    }`}
                    tooltip={isCollapsed ? item.title : undefined}
                  >
                    <div className="flex items-center gap-3 w-full">
                      <div className={`p-2.5 rounded-xl transition-all duration-300 ${
                        isActive(item.url) 
                          ? 'bg-primary/20 text-primary shadow-glow' 
                          : 'bg-muted/50 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                      }`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      {!isCollapsed && (
                        <div className="flex flex-col items-start flex-1">
                          <span className={`font-bold text-base transition-colors ${
                            isActive(item.url) ? 'text-primary' : 'text-foreground group-hover:text-primary'
                          }`}>
                            {item.title}
                          </span>
                          <span className="text-xs text-muted-foreground mt-0.5">{item.description}</span>
                        </div>
                      )}
                    </div>
                    
                    {isActive(item.url) && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-primary rounded-r-full shadow-glow" />
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!isCollapsed && <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mx-4 mb-8" />}

        {/* Tool Sections with Modern Design */}
        {renderSection(
          productionTools, 
          "Produção", 
          Play, 
          "bg-production-muted border-production/20", 
          "bg-production/20"
        )}
        {renderSection(
          brandingTools, 
          "Identidade Visual", 
          Palette, 
          "bg-identity-muted border-identity/20", 
          "bg-identity/20"
        )}
        {renderSection(
          growthTools, 
          "Crescimento", 
          BarChart3, 
          "bg-growth-muted border-growth/20", 
          "bg-growth/20"
        )}
        {renderSection(
          supportTools, 
          "Suporte e Comunidade", 
          Users, 
          "bg-support-muted border-support/20", 
          "bg-support/20"
        )}
      </SidebarContent>
    </Sidebar>
  );
}