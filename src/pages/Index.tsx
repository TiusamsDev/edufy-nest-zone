import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { CoursePage } from "@/components/CoursePage";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import logo from "@/assets/logo.png";

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
      <div className="min-h-screen bg-overlay flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 overflow-hidden">
            <img src={logo} alt="Dark Club Academy" className="w-12 h-12 object-contain" />
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
    <SidebarProvider>
      <div className="min-h-screen bg-overlay flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1">
            {currentView === 'dashboard' && (
              <Dashboard 
                onCourseClick={handleCourseClick}
                onNewCourse={() => window.location.href = '/new-course'}
              />
            )}
            {currentView === 'course' && (
              <CoursePage courseId={selectedCourseId} onBack={handleBackToDashboard} />
            )}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
