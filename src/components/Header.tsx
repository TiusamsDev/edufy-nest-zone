import { Button } from "@/components/ui/button";

interface HeaderProps {
  userType: 'admin' | 'producer' | 'student';
  onLogout: () => void;
}

export function Header({ userType, onLogout }: HeaderProps) {
  const getUserTypeLabel = () => {
    switch (userType) {
      case 'admin':
        return 'Administrador';
      case 'producer':
        return 'Produtor';
      case 'student':
        return 'Estudante';
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
          <Button variant="ghost" className="text-foreground hover:text-accent">
            Cursos
          </Button>
          <Button variant="ghost" className="text-foreground hover:text-accent">
            Perfil
          </Button>
          <Button 
            variant="outline" 
            onClick={onLogout}
            className="border-border text-foreground hover:bg-secondary"
          >
            Sair
          </Button>
        </nav>
      </div>
    </header>
  );
}