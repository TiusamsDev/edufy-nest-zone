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
    id: "web-dev-complete",
    title: "Desenvolvimento Web Completo 2024",
    description: "Aprenda HTML, CSS, JavaScript, React e Node.js do zero ao avançado. O curso mais completo de desenvolvimento web disponível no mercado.",
    image: webDevImage,
    duration: "40h",
    students: 2847,
    rating: 4.8,
    progress: 25,
    level: "Iniciante",
    category: "Programação",
    instructor: "Ana Silva",
    completedLessons: 8,
    totalLessons: 32
  };

  const modules = [
    {
      id: 1,
      title: "Fundamentos do HTML",
      lessons: [
        { id: 1, title: "Introdução ao HTML", duration: "15min", completed: true, type: "video" },
        { id: 2, title: "Estrutura básica de um documento", duration: "20min", completed: true, type: "video" },
        { id: 3, title: "Tags semânticas", duration: "25min", completed: true, type: "video" },
        { id: 4, title: "Exercício prático", duration: "30min", completed: false, type: "exercise" }
      ]
    },
    {
      id: 2,
      title: "CSS Essencial",
      lessons: [
        { id: 5, title: "Seletores CSS", duration: "18min", completed: true, type: "video" },
        { id: 6, title: "Box Model", duration: "22min", completed: true, type: "video" },
        { id: 7, title: "Flexbox", duration: "30min", completed: true, type: "video" },
        { id: 8, title: "Grid Layout", duration: "35min", completed: true, type: "video" },
        { id: 9, title: "Responsividade", duration: "28min", completed: false, type: "video" }
      ]
    },
    {
      id: 3,
      title: "JavaScript Fundamentals",
      lessons: [
        { id: 10, title: "Variáveis e tipos de dados", duration: "20min", completed: false, type: "video" },
        { id: 11, title: "Funções", duration: "25min", completed: false, type: "video" },
        { id: 12, title: "Manipulação do DOM", duration: "30min", completed: false, type: "video" },
        { id: 13, title: "Eventos", duration: "22min", completed: false, type: "video" },
        { id: 14, title: "Projeto prático", duration: "45min", completed: false, type: "project" }
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
                <div className="max-h-96 overflow-y-auto">
                  {modules.map((module, moduleIndex) => (
                    <div key={module.id}>
                      <div className="p-4 bg-muted/30">
                        <h3 className="font-medium text-sm">
                          Módulo {module.id}: {module.title}
                        </h3>
                      </div>
                      
                      {module.lessons.map((lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className={`p-3 border-b last:border-b-0 cursor-pointer transition-colors hover:bg-muted/50 ${
                            selectedLesson === lesson.id ? "bg-primary/10" : ""
                          }`}
                          onClick={() => setSelectedLesson(lesson.id)}
                        >
                          <div className="flex items-center space-x-3">
                            {getLessonIcon(lesson.type, lesson.completed)}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {lesson.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {lesson.duration}
                              </p>
                            </div>
                            {!lesson.completed && (
                              <Lock className="h-3 w-3 text-muted-foreground" />
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {moduleIndex < modules.length - 1 && (
                        <Separator className="my-0" />
                      )}
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