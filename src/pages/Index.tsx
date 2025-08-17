import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { CoursePage } from "@/components/CoursePage";

type AppState = "login" | "dashboard" | "courses" | "profile" | "course-detail";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("login");
  const [currentCourseId, setCurrentCourseId] = useState<string>("");

  const handleLogin = (email: string, password: string) => {
    // Simular autenticação
    console.log("Login:", email, password);
    setCurrentState("dashboard");
  };

  const handleLogout = () => {
    setCurrentState("login");
  };

  const handleNavigate = (page: string) => {
    if (page === "dashboard") {
      setCurrentState("dashboard");
    } else if (page === "courses") {
      setCurrentState("courses");
    } else if (page === "profile") {
      setCurrentState("profile");
    }
  };

  const handleNavigateToCourse = (courseId: string) => {
    setCurrentCourseId(courseId);
    setCurrentState("course-detail");
  };

  const handleBackFromCourse = () => {
    setCurrentState("dashboard");
    setCurrentCourseId("");
  };

  if (currentState === "login") {
    return <LoginForm onLogin={handleLogin} />;
  }

  if (currentState === "course-detail") {
    return (
      <div className="min-h-screen bg-background">
        <Header 
          onLogout={handleLogout} 
          onNavigate={handleNavigate} 
          currentPage="courses"
        />
        <CoursePage 
          courseId={currentCourseId} 
          onBack={handleBackFromCourse}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header 
        onLogout={handleLogout} 
        onNavigate={handleNavigate} 
        currentPage={currentState}
      />
      
      {currentState === "dashboard" && (
        <Dashboard onNavigateToCourse={handleNavigateToCourse} />
      )}
      
      {currentState === "courses" && (
        <Dashboard onNavigateToCourse={handleNavigateToCourse} />
      )}
      
      {currentState === "profile" && (
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Meu Perfil</h1>
            <div className="bg-card rounded-lg p-6 shadow-card">
              <p className="text-muted-foreground">
                Página de perfil em desenvolvimento...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;