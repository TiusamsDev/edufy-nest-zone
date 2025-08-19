import { useState } from "react";
import { LoginForm } from "@/components/LoginForm";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { CoursePage } from "@/components/CoursePage";

type UserType = 'admin' | 'producer' | 'student';
type View = 'login' | 'dashboard' | 'course';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<UserType>('student');
  const [currentView, setCurrentView] = useState<View>('login');
  const [selectedCourseId, setSelectedCourseId] = useState<string>('');

  const handleLogin = (type: UserType) => {
    setUserType(type);
    setIsLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
    setSelectedCourseId('');
  };

  const handleCourseClick = (courseId: string) => {
    setSelectedCourseId(courseId);
    setCurrentView('course');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedCourseId('');
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Header userType={userType} onLogout={handleLogout} />
      {currentView === 'dashboard' && (
        <Dashboard userType={userType} onCourseClick={handleCourseClick} />
      )}
      {currentView === 'course' && (
        <CoursePage courseId={selectedCourseId} onBack={handleBackToDashboard} />
      )}
    </div>
  );
};

export default Index;
