import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, CheckCircle } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  isExtra?: boolean;
  lessons: string[];
}

interface CoursePageProps {
  courseId: string;
  onBack: () => void;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Curso 1 — Fundamentos dos Canais Dark",
    description: "Aprenda os conceitos fundamentais dos canais dark e como eles funcionam no YouTube.",
    lessons: [
      "O que é um canal dark e por que ele funciona",
      "Nichos mais lucrativos e menos concorridos",
      "Como escolher seu nicho com base em CPM e demanda",
      "Exemplos reais de canais dark de sucesso"
    ]
  },
  {
    id: "2",
    title: "Curso 2 — Criando seu Canal",
    description: "Passo a passo completo para criar e configurar seu canal do zero.",
    lessons: [
      "Criando uma conta Google do zero",
      "Configuração completa do canal (nome, logo, banner)",
      "Ferramentas para identidade visual (Canva, Photoshop)",
      "Configurações e boas práticas do YouTube"
    ]
  },
  {
    id: "3",
    title: "Curso 3 — Produção de Conteúdo",
    description: "Domine a arte de criar conteúdo envolvente sem aparecer no vídeo.",
    lessons: [
      "Onde encontrar ideias e roteiros prontos",
      "Criando roteiros com IA",
      "Narrando sem aparecer (voz real ou IA)",
      "Bancos de imagens e vídeos livres de direitos"
    ]
  },
  {
    id: "4",
    title: "Curso 4 — Edição de Vídeos",
    description: "Aprenda técnicas profissionais de edição para manter a audiência engajada.",
    lessons: [
      "Introdução ao CapCut (mobile e desktop)",
      "Cortes dinâmicos e legendas automáticas",
      "Efeitos e transições para retenção",
      "Otimização de qualidade para o YouTube"
    ]
  },
  {
    id: "5",
    title: "Curso 5 — Publicação Estratégica",
    description: "Estratégias avançadas para maximizar o alcance dos seus vídeos.",
    lessons: [
      "Como postar vídeos do jeito certo (título, descrição, tags)",
      "Criando thumbnails atrativas",
      "Horários ideais para postar",
      "Playlists e telas finais para retenção"
    ]
  },
  {
    id: "6",
    title: "Curso 6 — Crescimento e Algoritmo",
    description: "Entenda como funciona o algoritmo e como usar isso a seu favor.",
    lessons: [
      "Como o algoritmo recomenda vídeos",
      "Técnicas para aumentar CTR e retenção",
      "SEO no YouTube (palavras-chave e tendências)",
      "Shorts vs vídeos longos"
    ]
  },
  {
    id: "7",
    title: "Curso 7 — Monetização e Escala",
    description: "Transforme seus vídeos em uma fonte de renda consistente.",
    lessons: [
      "Requisitos para monetizar",
      "Como aumentar o CPM",
      "Outras formas de ganhar (afiliados, produtos digitais)",
      "Escalando com múltiplos canais"
    ]
  },
  {
    id: "8",
    title: "Curso Extra — Hacks e Segredos",
    description: "Técnicas avançadas e segredos dos profissionais para acelerar resultados.",
    isExtra: true,
    lessons: [
      "Criando vídeos em massa com automação",
      "Usando IA para acelerar produção",
      "Fontes de músicas sem copyright",
      "Como evitar strikes e banimentos"
    ]
  }
];

export function CoursePage({ courseId, onBack }: CoursePageProps) {
  const course = courses.find(c => c.id === courseId);
  
  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Curso não encontrado</p>
      </div>
    );
  }

  // Simular progresso (primeira aula concluída)
  const completedLessons = [0];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="text-foreground hover:text-accent mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para cursos
          </Button>
          
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-foreground">
                {course.title}
              </h1>
              {course.isExtra && (
                <Badge className="bg-accent text-accent-foreground">
                  Extra
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground text-lg">
              {course.description}
            </p>
            <div className="flex items-center gap-4 pt-2">
              <span className="text-sm text-accent font-medium">
                {completedLessons.length}/{course.lessons.length} aulas concluídas
              </span>
              <div className="flex-1 bg-secondary rounded-full h-2">
                <div 
                  className="gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(completedLessons.length / course.lessons.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground mb-4">Aulas do Curso</h2>
          {course.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(index);
            const isNext = index === completedLessons.length;
            
            return (
              <Card 
                key={index} 
                className={`gradient-card border-border/50 transition-all duration-300 cursor-pointer hover:border-accent/50 ${
                  isNext ? 'ring-2 ring-accent/30' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isCompleted ? 'bg-green-500' : isNext ? 'gradient-primary' : 'bg-secondary'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <Play className="w-4 h-4 text-white ml-0.5" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">
                          Aula {index + 1}: {lesson}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {isCompleted ? 'Concluída' : isNext ? 'Próxima aula' : 'Não iniciada'}
                        </p>
                      </div>
                    </div>
                    
                    <Button 
                      className={`${
                        isCompleted ? 'bg-green-500 hover:bg-green-600' : 
                        isNext ? 'gradient-primary hover:gradient-hover' : 
                        'bg-secondary hover:bg-secondary/80'
                      } text-white`}
                      disabled={!isCompleted && !isNext}
                    >
                      {isCompleted ? 'Revisar' : 'Assistir'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}