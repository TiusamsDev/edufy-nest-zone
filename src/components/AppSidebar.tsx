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
  Megaphone
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const aiTools = [
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
  },
  { 
    title: "Identidade Visual", 
    url: "/brand-identity", 
    icon: Palette,
    description: "Crie logos e identidade visual"
  },
  { 
    title: "Thumbnails", 
    url: "/thumbnails", 
    icon: PenTool,
    description: "Miniaturas chamativas"
  },
  { 
    title: "Trilha Sonora", 
    url: "/music-ai", 
    icon: Music,
    description: "Música de fundo personalizada"
  },
  { 
    title: "Copy para Redes", 
    url: "/social-copy", 
    icon: Megaphone,
    description: "Textos para posts e descrições"
  },
  { 
    title: "Assistente IA", 
    url: "/ai-assistant", 
    icon: Bot,
    description: "Chat para dúvidas e ideias"
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const navigate = useNavigate();
  const isCollapsed = state === "collapsed";

  const handleToolClick = (url: string) => {
    navigate(url);
  };

  return (
    <Sidebar className="border-r border-border/50">
      <SidebarContent className="bg-card/50 backdrop-blur-sm">
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            <Sparkles className="w-4 h-4 mr-2" />
            {!isCollapsed && "Ferramentas IA"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {aiTools.map((tool) => (
                <SidebarMenuItem key={tool.title}>
                  <SidebarMenuButton 
                    onClick={() => handleToolClick(tool.url)}
                    className="group hover:bg-accent/50 transition-all duration-200"
                    tooltip={isCollapsed ? tool.title : undefined}
                  >
                    <tool.icon className="w-4 h-4 text-primary group-hover:text-accent transition-colors" />
                    {!isCollapsed && (
                      <div className="flex flex-col items-start">
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