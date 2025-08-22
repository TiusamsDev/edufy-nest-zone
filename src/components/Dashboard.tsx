import { useEffect, useState, useMemo } from "react";
import { CourseCard } from "./CourseCard";
import { CourseFilters } from "./CourseFilters";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Star, Zap, BarChart3 } from "lucide-react";

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

interface DashboardProps {
  onCourseClick: (courseId: string) => void;
  onNewCourse?: () => void;
}

export function Dashboard({ onCourseClick, onNewCourse }: DashboardProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  
  const { profile, userRole } = useAuth();

  useEffect(() => {
    fetchCourses();
    fetchUserProgress();
  }, []);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching courses:', error);
      } else {
        setCourses((data || []).map(course => ({
          ...course,
          level: course.level as 'iniciante' | 'intermediario' | 'avancado' | undefined
        })));
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    try {
      const { data: progressData, error } = await supabase
        .from('user_progress')
        .select(`
          lesson_id,
          completed,
          lessons(course_id)
        `);

      if (!error && progressData) {
        const progressByCoursé: Record<string, number> = {};
        
        // Get all lessons for each course
        const { data: allLessons } = await supabase
          .from('lessons')
          .select('id, course_id');

        if (allLessons) {
          // Group lessons by course
          const lessonsByCourse: Record<string, string[]> = {};
          allLessons.forEach(lesson => {
            if (!lessonsByCourse[lesson.course_id]) {
              lessonsByCourse[lesson.course_id] = [];
            }
            lessonsByCourse[lesson.course_id].push(lesson.id);
          });

          // Calculate progress for each course
          Object.entries(lessonsByCourse).forEach(([courseId, lessonIds]) => {
            const completedLessons = progressData.filter(
              p => p.completed && lessonIds.includes(p.lesson_id)
            ).length;
            
            progressByCoursé[courseId] = (completedLessons / lessonIds.length) * 100;
          });
        }

        setUserProgress(progressByCoursé);
      }
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  // Filter courses based on search and filters
  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
      const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
      const matchesFeatured = !showFeaturedOnly || !!course.is_featured;
      
      return matchesSearch && matchesCategory && matchesLevel && matchesFeatured;
    });
  }, [courses, searchTerm, selectedCategory, selectedLevel, showFeaturedOnly]);

  const hasActiveFilters = searchTerm || selectedCategory !== 'all' || 
                          selectedLevel !== 'all' || showFeaturedOnly;

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedLevel('all');
    setShowFeaturedOnly(false);
  };

  const canManageCourses = userRole === 'admin' || userRole === 'producer';

  if (loading) {
    return (
      <main className="flex-1 max-w-7xl mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Carregando cursos...</p>
        </div>
      </main>
    );
  }

  // Calculate progress summary
  const totalCourses = filteredCourses.length;
  const coursesWithProgress = Object.keys(userProgress).length;
  const completedCourses = Object.values(userProgress).filter(progress => progress === 100).length;
  const inProgressCourses = Object.values(userProgress).filter(progress => progress > 0 && progress < 100).length;
  const averageProgress = coursesWithProgress > 0 
    ? Object.values(userProgress).reduce((sum, progress) => sum + progress, 0) / coursesWithProgress 
    : 0;

  return (
    <main className="flex-1 max-w-7xl mx-auto p-8 space-y-8">
      {/* Welcome Header */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground tracking-tight">
            Bem-vindo, {profile?.name || 'Estudante'}
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            {userRole === 'admin' && 'Gerencie a plataforma e todos os cursos disponíveis'}
            {userRole === 'producer' && 'Crie e gerencie seus cursos com facilidade'}
            {userRole === 'student' && 'Continue sua jornada de aprendizado no mundo dos canais dark'}
          </p>
        </div>
        
        {canManageCourses && onNewCourse && (
          <Button onClick={onNewCourse} className="gradient-primary text-white shadow-lg hover:shadow-glow transition-all duration-300">
            <Plus className="w-4 h-4 mr-2" />
            Novo Curso
          </Button>
        )}
      </div>

      {/* Progress Summary Cards */}
      {coursesWithProgress > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="gradient-card p-6 rounded-xl border border-border/30 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/20">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Total de Cursos</h3>
            </div>
            <p className="text-2xl font-bold text-foreground">{totalCourses}</p>
            <p className="text-sm text-muted-foreground">cursos disponíveis</p>
          </div>

          <div className="gradient-card p-6 rounded-xl border border-border/30 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-growth/20">
                <Zap className="w-5 h-5 text-growth" />
              </div>
              <h3 className="font-semibold text-foreground">Em Progresso</h3>
            </div>
            <p className="text-2xl font-bold text-foreground">{inProgressCourses}</p>
            <p className="text-sm text-muted-foreground">cursos iniciados</p>
          </div>

          <div className="gradient-card p-6 rounded-xl border border-border/30 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-accent/20">
                <Star className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Concluídos</h3>
            </div>
            <p className="text-2xl font-bold text-foreground">{completedCourses}</p>
            <p className="text-sm text-muted-foreground">cursos finalizados</p>
          </div>

          <div className="gradient-card p-6 rounded-xl border border-border/30 shadow-soft">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-production/20">
                <BarChart3 className="w-5 h-5 text-production" />
              </div>
              <h3 className="font-semibold text-foreground">Progresso Médio</h3>
            </div>
            <p className="text-2xl font-bold text-foreground">{Math.round(averageProgress)}%</p>
            <p className="text-sm text-muted-foreground">de conclusão</p>
          </div>
        </div>
      )}

      {/* Filters and Course Section */}
      <div className="space-y-6">

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Explorar Cursos</h2>
          <CourseFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedLevel={selectedLevel}
            onLevelChange={setSelectedLevel}
            showFeaturedOnly={showFeaturedOnly}
            onFeaturedToggle={() => setShowFeaturedOnly(!showFeaturedOnly)}
            onClearFilters={clearFilters}
            hasActiveFilters={Boolean(hasActiveFilters)}
          />
        </div>
      </div>

      {filteredCourses.length === 0 ? (
        <div className="text-center py-16">
          <div className="gradient-card p-8 rounded-xl border border-border/30 shadow-soft max-w-md mx-auto">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">
              {hasActiveFilters ? 'Nenhum curso encontrado com os filtros aplicados.' : 'Nenhum curso disponível no momento.'}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters} className="mt-6">
                Limpar Filtros
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onClick={() => onCourseClick(course.id)}
              progress={userProgress[course.id]}
            />
          ))}
        </div>
      )}
    </main>
  );
}