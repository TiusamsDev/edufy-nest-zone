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
      case 'fundamentos': return 'bg-production-muted text-production border-production/30';
      case 'criacao-canal': return 'bg-identity-muted text-identity border-identity/30';
      case 'monetizacao': return 'bg-growth-muted text-growth border-growth/30';
      default: return 'bg-accent/15 text-accent border-accent/30';
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
    <Card className={`gradient-card border-border/30 hover:border-primary/30 transition-all duration-500 cursor-pointer group relative overflow-hidden shadow-soft hover:shadow-glow hover:scale-[1.02] ${course.is_featured ? 'ring-2 ring-primary/40 shadow-primary/20' : ''}`}
          onClick={onClick}>
      {course.is_featured && (
        <div className="absolute top-4 right-4 bg-gradient-primary text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
          ⭐ Destaque
        </div>
      )}
      
      <CardHeader className="space-y-4 p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-xl border shadow-sm ${getCategoryColor(course.category)}`}>
            <IconComponent className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-tight">
              {course.title}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge variant="outline" className="text-xs font-medium bg-muted/50">
                {getLevelText(course.level)}
              </Badge>
              {course.duration_minutes && (
                <Badge variant="outline" className="text-xs flex items-center gap-1 bg-muted/50">
                  <Clock className="w-3 h-3" />
                  {formatDuration(course.duration_minutes)}
                </Badge>
              )}
              {course.is_extra && (
                <Badge className="bg-accent/20 text-accent border-accent/30 text-xs font-medium">
                  Extra
                </Badge>
              )}
            </div>
          </div>
        </div>
        
        <CardDescription className="text-muted-foreground leading-relaxed line-clamp-3 text-sm">
          {course.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-5 p-6 pt-0">
        {progress !== undefined && (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground font-medium">Progresso do Curso</span>
              <span className={`font-bold ${progress === 100 ? 'text-green-400' : 'text-primary'}`}>
                {Math.round(progress)}%
              </span>
            </div>
            <Progress 
              value={progress} 
              className={`h-2.5 ${progress === 100 ? '[&>div]:bg-green-400' : ''}`} 
            />
            {progress === 100 && (
              <div className="flex items-center gap-2 text-green-400 text-sm font-medium">
                <Star className="w-4 h-4 fill-current" />
                Curso Concluído!
              </div>
            )}
          </div>
        )}
        
        <Button className={`w-full font-semibold transition-all duration-300 ${
          progress === 100 
            ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-green-500/25' 
            : 'gradient-primary hover:gradient-hover text-white shadow-lg hover:shadow-primary/25'
        }`}>
          {progress === 100 ? '✓ Revisar Conteúdo' : progress ? '▶ Continuar Curso' : '🚀 Começar Agora'}
        </Button>
      </CardContent>
    </Card>
  );
}