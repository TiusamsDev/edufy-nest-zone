import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, Zap } from "lucide-react";

interface Course {
  id: string;
  title: string;
  description: string;
  is_extra?: boolean;
  is_published: boolean;
  created_by?: string;
  category?: string;
  level?: 'iniciante' | 'intermediario' | 'avancado';
  duration_minutes?: number;
  is_featured?: boolean;
}

interface CourseCardProps {
  course: Course;
  onClick: () => void;
  progress?: number;
}

export function CourseCard({ course, onClick, progress }: CourseCardProps) {
  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'fundamentos': return BookOpen;
      case 'criacao-canal': return Zap;
      case 'monetizacao': return Star;
      default: return BookOpen;
    }
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'fundamentos': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'criacao-canal': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'monetizacao': return 'bg-green-500/10 text-green-400 border-green-500/20';
      default: return 'bg-accent/10 text-accent border-accent/20';
    }
  };

  const getLevelText = (level?: string) => {
    switch (level) {
      case 'iniciante': return 'Iniciante';
      case 'intermediario': return 'Intermediário';
      case 'avancado': return 'Avançado';
      default: return 'Geral';
    }
  };

  const formatDuration = (minutes?: number) => {
    if (!minutes) return '';
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h${mins > 0 ? ` ${mins}m` : ''}`;
    }
    return `${mins}m`;
  };

  const IconComponent = getCategoryIcon(course.category);

  return (
    <Card className={`gradient-card border-border/50 hover:border-accent/50 transition-all duration-300 cursor-pointer group relative overflow-hidden ${course.is_featured ? 'ring-2 ring-accent/30' : ''}`}
          onClick={onClick}>
      {course.is_featured && (
        <div className="absolute top-0 right-0 bg-accent text-accent-foreground text-xs font-semibold px-2 py-1 rounded-bl-md">
          Destaque
        </div>
      )}
      
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg border ${getCategoryColor(course.category)}`}>
              <IconComponent className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
                {course.title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="outline" className="text-xs">
                  {getLevelText(course.level)}
                </Badge>
                {course.duration_minutes && (
                  <Badge variant="outline" className="text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDuration(course.duration_minutes)}
                  </Badge>
                )}
              </div>
            </div>
          </div>
          {course.is_extra && (
            <Badge className="bg-accent text-accent-foreground">
              Extra
            </Badge>
          )}
        </div>
        
        <CardDescription className="text-muted-foreground leading-relaxed line-clamp-2">
          {course.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progresso</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}
        
        <Button className="w-full gradient-primary hover:gradient-hover text-white font-medium">
          {progress === 100 ? 'Revisar' : progress ? 'Continuar' : 'Começar'}
        </Button>
      </CardContent>
    </Card>
  );
}