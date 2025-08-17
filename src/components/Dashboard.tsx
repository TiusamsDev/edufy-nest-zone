import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, BookOpen, Clock, Target } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";

interface DashboardProps {
  onNavigateToCourse: (courseId: string) => void;
}

export function Dashboard({ onNavigateToCourse }: DashboardProps) {
  const stats = [
    {
      title: "Progresso Geral",
      value: "25%",
      icon: Target,
      color: "text-primary"
    },
    {
      title: "Módulos Concluídos",
      value: "3/12",
      icon: BookOpen,
      color: "text-primary"
    },
    {
      title: "Tempo de Estudo",
      value: "12h",
      icon: Clock,
      color: "text-primary"
    },
    {
      title: "Próxima Meta",
      value: "Módulo 4",
      icon: Trophy,
      color: "text-primary"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section - Curso Único */}
      <section className="relative rounded-2xl overflow-hidden shadow-elevated">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Dark Club Educação" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero opacity-90" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <div className="max-w-2xl">
            <span className="inline-block bg-primary/20 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
              🔥 Curso Exclusivo
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
              Dark Club - Metodologia Avançada
            </h1>
            <p className="text-lg mb-6 text-white/90 animate-slide-up">
              Acesso exclusivo ao conteúdo premium do Dark Club. 
              Transforme sua mentalidade e desenvolva habilidades de elite.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up">
              <Button 
                onClick={() => onNavigateToCourse("dark-club")}
                size="lg" 
                className="bg-white text-primary hover:bg-white/90"
              >
                Continuar Assistindo
              </Button>
              <div className="flex items-center text-white/80">
                <div className="w-32 bg-white/20 rounded-full h-2 mr-3">
                  <div className="bg-white rounded-full h-2 w-1/4"></div>
                </div>
                <span className="text-sm">25% concluído</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="gradient-card shadow-card hover-lift transition-smooth">
              <CardContent className="p-6 text-center">
                <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Próximos Módulos */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Próximos Módulos</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="gradient-card shadow-card hover-lift transition-smooth">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Módulo 4: Estratégias Avançadas</h3>
                <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">Próximo</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Aprenda técnicas avançadas para maximizar seus resultados.
              </p>
              <Button 
                onClick={() => onNavigateToCourse("dark-club")}
                className="w-full"
              >
                Iniciar Módulo
              </Button>
            </CardContent>
          </Card>
          
          <Card className="gradient-card shadow-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Módulo 5: Implementação</h3>
                <span className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs">Bloqueado</span>
              </div>
              <p className="text-muted-foreground mb-4">
                Coloque em prática tudo o que aprendeu nos módulos anteriores.
              </p>
              <Button disabled className="w-full">
                Complete o Módulo 4 primeiro
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}