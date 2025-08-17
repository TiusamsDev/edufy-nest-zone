import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Users, Star, PlayCircle } from "lucide-react";

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    image: string;
    duration: string;
    students: number;
    rating: number;
    progress?: number;
    price?: string;
    level: string;
    category: string;
  };
  onEnroll?: (courseId: string) => void;
  onContinue?: (courseId: string) => void;
  variant?: "featured" | "regular";
}

export function CourseCard({ course, onEnroll, onContinue, variant = "regular" }: CourseCardProps) {
  const isEnrolled = course.progress !== undefined;

  if (variant === "featured") {
    return (
      <Card className="relative overflow-hidden gradient-card border-0 shadow-elevated hover-lift transition-smooth">
        <div className="absolute top-4 left-4 z-10">
          <Badge className="gradient-primary text-white border-0">
            ⭐ Curso em Destaque
          </Badge>
        </div>
        
        <CardHeader className="p-0">
          <div className="relative h-48 overflow-hidden">
            <img 
              src={course.image} 
              alt={course.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-white/90 text-sm">{course.description}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {course.duration}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {course.students}
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                {course.rating}
              </div>
            </div>
          </div>

          {isEnrolled && course.progress !== undefined && (
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Progresso</span>
                <span>{course.progress}% concluído</span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary">{course.level}</Badge>
              <Badge variant="outline">{course.category}</Badge>
            </div>
            {course.price && !isEnrolled && (
              <span className="text-lg font-bold text-primary">{course.price}</span>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0">
          {isEnrolled ? (
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full"
              onClick={() => onContinue?.(course.id)}
            >
              <PlayCircle className="h-4 w-4" />
              Continuar Curso
            </Button>
          ) : (
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full"
              onClick={() => onEnroll?.(course.id)}
            >
              Iniciar Curso
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden shadow-card hover-lift transition-smooth border-border/50">
      <CardHeader className="p-0">
        <div className="relative h-40 overflow-hidden">
          <img 
            src={course.image} 
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Badge variant="secondary" className="text-xs">{course.level}</Badge>
          <Badge variant="outline" className="text-xs">{course.category}</Badge>
        </div>
        
        <h3 className="font-semibold text-sm mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{course.description}</p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center">
            <Clock className="h-3 w-3 mr-1" />
            {course.duration}
          </div>
          <div className="flex items-center">
            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
            {course.rating}
          </div>
        </div>

        {isEnrolled && course.progress !== undefined && (
          <div className="mb-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Progresso</span>
              <span>{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-1" />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        {isEnrolled ? (
          <Button 
            variant="course" 
            size="sm" 
            className="w-full"
            onClick={() => onContinue?.(course.id)}
          >
            Continuar
          </Button>
        ) : (
          <div className="w-full space-y-2">
            {course.price && (
              <div className="text-center text-sm font-semibold text-primary">
                {course.price}
              </div>
            )}
            <Button 
              variant="course" 
              size="sm" 
              className="w-full"
              onClick={() => onEnroll?.(course.id)}
            >
              Acessar
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}