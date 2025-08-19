import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { CoursePage } from "@/components/CoursePage";
import { useAuth } from "@/hooks/useAuth";

type View = 'dashboard' | 'course';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');
  
  const { user, userRole, loading } = useAuth();

  const handleCourseClick = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('course');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedCourseId('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-white">DC</span>
          </div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {currentView === 'dashboard' && (
        <Dashboard onCourseClick={handleCourseClick} />
      )}
      {currentView === 'course' && (
        <CoursePage courseId={selectedCourseId} onBack={handleBackToDashboard} />
      )}
    </div>
  );
};

export default Index;
