import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  PlayCircle, 
  CheckCircle, 
  Clock, 
  Users, 
  Star, 
  ArrowLeft,
  Lock,
  FileText,
  Video,
  Download
} from "lucide-react";
import webDevImage from "@/assets/course-web-dev.jpg";

interface CoursePageProps {
  courseId: string;
  onBack: () => void;
}

export function CoursePage({ courseId, onBack }: CoursePageProps) {
  const [selectedLesson, setSelectedLesson] = useState(0);

  // Mock data - em uma aplicação real, isso viria de uma API
  const course = {
    id: "dark-club",
    title: "Dark Club — Canais Dark do Zero",
    description: "Aprenda a criar e monetizar canais no YouTube sem aparecer. Do zero ao primeiro faturamento em 30 dias.",
    image: webDevImage,
    duration: "25h",
    students: 1247,
    rating: 4.9,
    progress: 15,
    level: "Iniciante",
    category: "YouTube Marketing",
    instructor: "Dark Club Academy",
    completedLessons: 3,
    totalLessons: 35
  };

  const modules = [
    {
      id: 1,
      title: "Fundamentos dos Canais Dark",
      description: "Entenda os conceitos fundamentais para criar canais de sucesso",
      lessons: [
        { id: 1, title: "O que é um canal dark e por que ele funciona", duration: "22min", completed: true, type: "video" },
        { id: 2, title: "Nichos mais lucrativos e menos concorridos", duration: "18min", completed: true, type: "video" },
        { id: 3, title: "Como escolher seu nicho com base em CPM e demanda", duration: "25min", completed: true, type: "video" },
        { id: 4, title: "Exemplos reais de canais dark de sucesso", duration: "30min", completed: false, type: "video" }
      ]
    },
    {
      id: 2,
      title: "Criando seu Canal",
      description: "Configure seu canal do zero com as melhores práticas",
      lessons: [
        { id: 5, title: "Criando uma conta Google do zero", duration: "15min", completed: false, type: "video" },
        { id: 6, title: "Configuração completa do canal (nome, logo, banner)", duration: "20min", completed: false, type: "video" },
        { id: 7, title: "Ferramentas para identidade visual (Canva, Photoshop)", duration: "35min", completed: false, type: "video" },
        { id: 8, title: "Configurações e boas práticas do YouTube", duration: "28min", completed: false, type: "video" }
      ]
    },
    {
      id: 3,
      title: "Produção de Conteúdo",
      description: "Crie conteúdo atrativo e viral sem aparecer",
      lessons: [
        { id: 9, title: "Onde encontrar ideias e roteiros prontos", duration: "20min", completed: false, type: "video" },
        { id: 10, title: "Criando roteiros com IA", duration: "25min", completed: false, type: "video" },
        { id: 11, title: "Narrando sem aparecer (voz real ou IA)", duration: "30min", completed: false, type: "video" },
        { id: 12, title: "Bancos de imagens e vídeos livres de direitos", duration: "18min", completed: false, type: "video" }
      ]
    },
    {
      id: 4,
      title: "Edição de Vídeos",
      description: "Edite vídeos profissionais que prendem a atenção",
      lessons: [
        { id: 13, title: "Introdução ao CapCut (mobile e desktop)", duration: "25min", completed: false, type: "video" },
        { id: 14, title: "Cortes dinâmicos e legendas automáticas", duration: "30min", completed: false, type: "video" },
        { id: 15, title: "Efeitos e transições para retenção", duration: "28min", completed: false, type: "video" },
        { id: 16, title: "Otimização de qualidade para o YouTube", duration: "22min", completed: false, type: "video" }
      ]
    },
    {
      id: 5,
      title: "Publicação Estratégica",
      description: "Publique seus vídeos da forma mais otimizada possível",
      lessons: [
        { id: 17, title: "Como postar vídeos do jeito certo (título, descrição, tags)", duration: "35min", completed: false, type: "video" },
        { id: 18, title: "Criando thumbnails atrativas", duration: "40min", completed: false, type: "video" },
        { id: 19, title: "Horários ideais para postar", duration: "15min", completed: false, type: "video" },
        { id: 20, title: "Playlists e telas finais para retenção", duration: "25min", completed: false, type: "video" }
      ]
    },
    {
      id: 6,
      title: "Crescimento e Algoritmo",
      description: "Domine o algoritmo do YouTube para crescer rapidamente",
      lessons: [
        { id: 21, title: "Como o algoritmo recomenda vídeos", duration: "30min", completed: false, type: "video" },
        { id: 22, title: "Técnicas para aumentar CTR e retenção", duration: "35min", completed: false, type: "video" },
        { id: 23, title: "SEO no YouTube (palavras-chave e tendências)", duration: "28min", completed: false, type: "video" },
        { id: 24, title: "Shorts vs vídeos longos", duration: "20min", completed: false, type: "video" }
      ]
    },
    {
      id: 7,
      title: "Monetização e Escala",
      description: "Transforme visualizações em dinheiro e escale seus resultados",
      lessons: [
        { id: 25, title: "Requisitos para monetizar", duration: "18min", completed: false, type: "video" },
        { id: 26, title: "Como aumentar o CPM", duration: "25min", completed: false, type: "video" },
        { id: 27, title: "Outras formas de ganhar (afiliados, produtos digitais)", duration: "32min", completed: false, type: "video" },
        { id: 28, title: "Escalando com múltiplos canais", duration: "40min", completed: false, type: "video" }
      ]
    },
    {
      id: 8,
      title: "Hacks e Segredos",
      description: "Técnicas avançadas e automações para acelerar resultados",
      badge: "EXTRA",
      lessons: [
        { id: 29, title: "Criando vídeos em massa com automação", duration: "45min", completed: false, type: "video" },
        { id: 30, title: "Usando IA para acelerar produção", duration: "35min", completed: false, type: "video" },
        { id: 31, title: "Fontes de músicas sem copyright", duration: "20min", completed: false, type: "video" },
        { id: 32, title: "Como evitar strikes e banimentos", duration: "25min", completed: false, type: "video" }
      ]
    }
  ];

  const getNextLesson = () => {
    const allLessons = modules.flatMap(module => module.lessons);
    const currentIndex = allLessons.findIndex(lesson => lesson.id === selectedLesson);
    return allLessons[currentIndex + 1];
  };

  const getLessonIcon = (type: string, completed: boolean) => {
    if (completed) return <CheckCircle className="h-4 w-4 text-green-600" />;
    
    switch (type) {
      case "video": return <Video className="h-4 w-4 text-blue-600" />;
      case "exercise": return <FileText className="h-4 w-4 text-orange-600" />;
      case "project": return <Download className="h-4 w-4 text-purple-600" />;
      default: return <PlayCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
              Voltar
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold">{course.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                <span>Por {course.instructor}</span>
                <span>•</span>
                <div className="flex items-center">
                  <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                  {course.rating}
                </div>
                <span>•</span>
                <span>{course.completedLessons} de {course.totalLessons} aulas</span>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Progresso do curso</span>
              <span>{course.progress}% concluído</span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player / Content */}
            <Card className="shadow-card">
              <CardContent className="p-0">
                <div className="aspect-video bg-black rounded-t-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <PlayCircle className="h-16 w-16 mx-auto mb-4 opacity-80" />
                    <p className="text-lg font-medium">Player de Vídeo</p>
                    <p className="text-sm opacity-80">
                      {selectedLesson ? `Aula ${selectedLesson}` : "Selecione uma aula"}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">
                      {selectedLesson ? `Aula ${selectedLesson}` : "Bem-vindo ao curso"}
                    </h2>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                        Material
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-6">
                    {course.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Badge>{course.level}</Badge>
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                    
                    {getNextLesson() && (
                      <Button variant="hero">
                        Próxima aula
                        <PlayCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="shadow-card text-center">
                <CardContent className="p-4">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                  <p className="font-semibold">{course.duration}</p>
                  <p className="text-sm text-muted-foreground">Duração total</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-card text-center">
                <CardContent className="p-4">
                  <Users className="h-6 w-6 mx-auto mb-2 text-green-600" />
                  <p className="font-semibold">{course.students}</p>
                  <p className="text-sm text-muted-foreground">Alunos matriculados</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-card text-center">
                <CardContent className="p-4">
                  <Star className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
                  <p className="font-semibold">{course.rating}/5</p>
                  <p className="text-sm text-muted-foreground">Avaliação média</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar - Course Content */}
          <div className="space-y-4">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-lg">Conteúdo do curso</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-track-background scrollbar-thumb-muted-foreground">
                  {modules.map((module, moduleIndex) => (
                    <div key={module.id} className="border-b border-border/40 last:border-b-0">
                      <div className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border-l-4 border-primary">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-base text-foreground">
                                Módulo {module.id} — {module.title}
                              </h3>
                              {module.badge && (
                                <Badge variant="outline" className="text-xs bg-primary/10 text-primary border-primary/20">
                                  {module.badge}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {module.description}
                            </p>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {module.lessons.length} aulas
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-card/50">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div
                            key={lesson.id}
                            className={`p-4 border-b border-border/20 last:border-b-0 cursor-pointer transition-all duration-200 hover:bg-primary/5 hover:border-l-4 hover:border-l-primary ${
                              selectedLesson === lesson.id ? "bg-primary/10 border-l-4 border-l-primary shadow-sm" : ""
                            }`}
                            onClick={() => setSelectedLesson(lesson.id)}
                          >
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                {getLessonIcon(lesson.type, lesson.completed)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-foreground truncate">
                                  {lesson.title}
                                </p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Clock className="h-3 w-3 text-muted-foreground" />
                                  <span className="text-xs text-muted-foreground">
                                    {lesson.duration}
                                  </span>
                                  {lesson.completed && (
                                    <Badge variant="outline" className="text-xs bg-green-50 text-green-600 border-green-200">
                                      Concluída
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <div className="flex-shrink-0">
                                {!lesson.completed ? (
                                  <Lock className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}