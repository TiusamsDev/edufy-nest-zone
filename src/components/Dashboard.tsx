import { CourseCard } from "./CourseCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, BookOpen, Clock, Target } from "lucide-react";
import heroImage from "@/assets/hero-education.jpg";
import webDevImage from "@/assets/course-web-dev.jpg";
import marketingImage from "@/assets/course-marketing.jpg";
import dataScienceImage from "@/assets/course-data-science.jpg";

interface DashboardProps {
  onNavigateToCourse: (courseId: string) => void;
}

export function Dashboard({ onNavigateToCourse }: DashboardProps) {
  const featuredCourse = {
    id: "web-dev-complete",
    title: "Desenvolvimento Web Completo 2024",
    description: "Aprenda HTML, CSS, JavaScript, React e Node.js do zero ao avançado. O curso mais completo de desenvolvimento web.",
    image: webDevImage,
    duration: "40h",
    students: 2847,
    rating: 4.8,
    progress: 25,
    level: "Iniciante",
    category: "Programação"
  };

  const courses = [
    {
      id: "digital-marketing",
      title: "Marketing Digital Estratégico",
      description: "Domine as principais estratégias de marketing digital para impulsionar seu negócio online.",
      image: marketingImage,
      duration: "25h",
      students: 1532,
      rating: 4.7,
      price: "R$ 197",
      level: "Intermediário",
      category: "Marketing"
    },
    {
      id: "data-science",
      title: "Ciência de Dados com Python",
      description: "Análise de dados, machine learning e visualização usando Python e suas principais bibliotecas.",
      image: dataScienceImage,
      duration: "35h",
      students: 923,
      rating: 4.9,
      progress: 65,
      level: "Avançado",
      category: "Data Science"
    },
    {
      id: "ux-design",
      title: "UX/UI Design Fundamentals",
      description: "Aprenda os fundamentos do design de experiência do usuário e interface.",
      image: webDevImage,
      duration: "20h",
      students: 1876,
      rating: 4.6,
      price: "R$ 147",
      level: "Iniciante",
      category: "Design"
    },
    {
      id: "mobile-dev",
      title: "Desenvolvimento Mobile React Native",
      description: "Crie aplicativos móveis nativos para iOS e Android usando React Native.",
      image: dataScienceImage,
      duration: "30h",
      students: 756,
      rating: 4.8,
      price: "R$ 247",
      level: "Intermediário",
      category: "Mobile"
    }
  ];

  const stats = [
    {
      title: "Cursos Concluídos",
      value: "3",
      icon: Trophy,
      color: "text-yellow-600"
    },
    {
      title: "Cursos em Andamento",
      value: "2",
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      title: "Horas de Estudo",
      value: "47h",
      icon: Clock,
      color: "text-green-600"
    },
    {
      title: "Progresso Geral",
      value: "68%",
      icon: Target,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <section className="relative rounded-2xl overflow-hidden shadow-elevated">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero opacity-90" />
        </div>
        <div className="relative z-10 p-8 md:p-12 text-white">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in">
              Bem-vindo de volta, João! 👋
            </h1>
            <p className="text-lg mb-6 text-white/90 animate-slide-up">
              Continue sua jornada de aprendizado. Você está fazendo um ótimo progresso!
            </p>
            <div className="flex items-center space-x-4 animate-slide-up">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <p className="text-sm text-white/80">Progresso Geral</p>
                <div className="mt-2">
                  <Progress value={68} className="h-2 bg-white/20" />
                  <p className="text-lg font-semibold mt-1">68% concluído</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card hover-lift transition-smooth">
              <CardContent className="p-4 text-center">
                <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Featured Course */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Continue de onde parou</h2>
        <CourseCard 
          course={featuredCourse}
          variant="featured"
          onContinue={onNavigateToCourse}
        />
      </section>

      {/* Course Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Explore outros cursos</h2>
          <button className="text-primary hover:text-primary/80 font-medium transition-colors">
            Ver todos →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => (
            <CourseCard 
              key={course.id}
              course={course}
              onEnroll={onNavigateToCourse}
              onContinue={onNavigateToCourse}
            />
          ))}
        </div>
      </section>
    </div>
  );
}