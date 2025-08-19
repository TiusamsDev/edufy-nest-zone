import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Course {
  id: string;
  title: string;
  description: string;
  isExtra?: boolean;
  lessons: string[];
}

interface CourseCardProps {
  course: Course;
  onCourseClick: (courseId: string) => void;
}

export function CourseCard({ course, onCourseClick }: CourseCardProps) {
  return (
    <Card className="gradient-card border-border/50 hover:border-accent/50 transition-all duration-300 cursor-pointer group"
          onClick={() => onCourseClick(course.id)}>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
            {course.title}
          </CardTitle>
          {course.isExtra && (
            <Badge className="bg-accent text-accent-foreground">
              Extra
            </Badge>
          )}
        </div>
        <CardDescription className="text-muted-foreground leading-relaxed">
          {course.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Aulas incluídas:</p>
          <ul className="space-y-1">
            {course.lessons.slice(0, 3).map((lesson, index) => (
              <li key={index} className="text-sm text-muted-foreground flex items-center">
                <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                {lesson}
              </li>
            ))}
            {course.lessons.length > 3 && (
              <li className="text-sm text-accent">
                +{course.lessons.length - 3} aulas adicionais
              </li>
            )}
          </ul>
        </div>
        
        <Button className="w-full gradient-primary hover:gradient-hover text-white font-medium">
          Acessar Curso
        </Button>
      </CardContent>
    </Card>
  );
}