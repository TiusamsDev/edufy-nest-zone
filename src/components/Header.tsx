import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Plus, Users, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

export function Header() {
  const { profile, userRole, signOut, canManageCourses, canManageUsers } = useAuth();
  const navigate = useNavigate();

  const getUserTypeLabel = () => {
    switch (userRole) {
      case 'admin':
        return 'Administrador';
      case 'producer':
        return 'Produtor';
      case 'student':
        return 'Estudante';
      default:
        return 'Usuário';
    }
  };

  return (
    <header className="gradient-card border-b border-border/50 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="hover:bg-white/10 transition-colors" />
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center space-x-4 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Dark Club Academy" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Dark Club Academy</h1>
              <p className="text-sm text-muted-foreground">{getUserTypeLabel()}</p>
            </div>
          </button>
        </div>
        
        <nav className="flex items-center space-x-4">
          {canManageCourses() && (
            <Button 
              variant="ghost" 
              onClick={() => navigate('/new-course')}
              className="text-foreground hover:text-accent"
            >
              <Plus className="w-4 h-4 mr-2" />
              Novo Curso
            </Button>
          )}
          
          {canManageUsers() && (
            <Button 
              variant="ghost" 
              onClick={() => navigate('/users')}
              className="text-foreground hover:text-accent"
            >
              <Users className="w-4 h-4 mr-2" />
              Usuários
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            onClick={() => navigate('/profile')}
            className="text-foreground hover:text-accent"
          >
            <Settings className="w-4 h-4 mr-2" />
            Perfil
          </Button>
          
          <Button 
            variant="outline" 
            onClick={signOut}
            className="border-border text-foreground hover:bg-secondary"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </nav>
      </div>
    </header>
  );
}