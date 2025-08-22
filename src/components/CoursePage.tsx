import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface Course {
  id: string;
  title: string;
  description: string;
  is_extra?: boolean;
  is_published: boolean;
  created_by?: string;
}

interface Lesson {
  id: string;
  title: string;
  content?: string;
  video_url?: string;
  order_index: number;
  course_id: string;
}

interface CoursePageProps {
  courseId: string;
  onBack: () => void;
}

export function CoursePage({ courseId, onBack }: CoursePageProps) {
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState<string[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchCourseData();
  }, [courseId]);

  const fetchCourseData = async () => {
    try {
      // Buscar dados do curso
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (courseError) {
        console.error('Error fetching course:', courseError);
        return;
      }

      setCourse(courseData);

      // Buscar aulas do curso
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index');

      if (lessonsError) {
        console.error('Error fetching lessons:', lessonsError);
      } else {
        setLessons(lessonsData || []);
      }

      // Buscar progresso do usuário se estiver logado
      if (user) {
        const { data: progressData, error: progressError } = await supabase
          .from('user_progress')
          .select('lesson_id')
          .eq('user_id', user.id)
          .eq('completed', true);

        if (progressError) {
          console.error('Error fetching progress:', progressError);
        } else {
          setUserProgress(progressData?.map(p => p.lesson_id) || []);
        }
      }

    } catch (error) {
      console.error('Error fetching course data:', error);
    } finally {
      setLoading(false);
    }
  };

  const markLessonComplete = async (lessonId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          completed: true,
          completed_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error updating progress:', error);
      } else {
        setUserProgress(prev => [...prev, lessonId]);
      }
    } catch (error) {
      console.error('Error marking lesson complete:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Carregando curso...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Curso não encontrado</p>
      </div>
    );
  }

  const completedLessonsCount = userProgress.length;

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
              {course.is_extra && (
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
                {completedLessonsCount}/{lessons.length} aulas concluídas
              </span>
              <div className="flex-1 bg-secondary rounded-full h-2">
                <div 
                  className="gradient-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${lessons.length > 0 ? (completedLessonsCount / lessons.length) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground mb-4">Aulas do Curso</h2>
          {lessons.length === 0 ? (
            <Card className="gradient-card border-border/50">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground">Nenhuma aula disponível para este curso.</p>
              </CardContent>
            </Card>
          ) : (
            lessons.map((lesson, index) => {
              const isCompleted = userProgress.includes(lesson.id);
              const isNext = index === completedLessonsCount;
              
              return (
                <Card 
                  key={lesson.id} 
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
                            Aula {lesson.order_index + 1}: {lesson.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {isCompleted ? 'Concluída' : isNext ? 'Próxima aula' : 'Não iniciada'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
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
                        {(isNext || isCompleted) && !isCompleted && (
                          <Button 
                            onClick={() => markLessonComplete(lesson.id)}
                            variant="outline"
                            className="border-green-500 text-green-500 hover:bg-green-50"
                          >
                            Marcar como Concluída
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}