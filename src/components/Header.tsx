import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Plus, Users, Settings } from "lucide-react";

export function Header() {
  const { profile, userRole, signOut, canManageCourses, canManageUsers } = useAuth();

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
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
            <span className="text-lg font-bold text-white">DC</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Dark Club Educação</h1>
            <p className="text-sm text-muted-foreground">{getUserTypeLabel()}</p>
          </div>
        </div>
        
        <nav className="flex items-center space-x-4">
          {canManageCourses() && (
            <Button variant="ghost" className="text-foreground hover:text-accent">
              <Plus className="w-4 h-4 mr-2" />
              Novo Curso
            </Button>
          )}
          
          {canManageUsers() && (
            <Button variant="ghost" className="text-foreground hover:text-accent">
              <Users className="w-4 h-4 mr-2" />
              Usuários
            </Button>
          )}
          
          <Button variant="ghost" className="text-foreground hover:text-accent">
            <Settings className="w-4 h-4 mr-2" />
            Perfil
          </Button>
          
          <Button 
            variant="outline" 
            onClick={signOut}
            className="border-border text-foreground hover:bg-secondary"
          >
            Sair
          </Button>
        </nav>
      </div>
    </header>
  );
}