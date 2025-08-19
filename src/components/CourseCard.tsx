import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Course {
  id: string;
  title: string;
  description: string;
  is_extra?: boolean;
  is_published: boolean;
  created_by: string;
}

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

export function CourseCard({ course, onClick }: CourseCardProps) {
  return (
    <Card className="gradient-card border-border/50 hover:border-accent/50 transition-all duration-300 cursor-pointer group"
          onClick={onClick}>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
            {course.title}
          </CardTitle>
          {course.is_extra && (
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
        <Button className="w-full gradient-primary hover:gradient-hover text-white font-medium">
          Acessar Curso
        </Button>
      </CardContent>
    </Card>
  );
}