import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Users as UsersIcon, Shield, User, GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, UserRole } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: string;
  name: string | null;
  email: string;
  role: UserRole;
  created_at: string;
}

export default function Users() {
  const navigate = useNavigate();
  const { userRole } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch users with their profiles and roles
      const { data: usersData, error } = await supabase
        .from('profiles')
        .select(`
          id,
          name,
          user_id,
          user_roles (
            role
          )
        `);

      if (error) {
        console.error('Error fetching users:', error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os usuários.",
          variant: "destructive",
        });
        return;
      }

      // Get user emails from auth metadata (this would need to be done server-side in a real app)
      const formattedUsers: UserData[] = usersData?.map(user => ({
        id: user.user_id,
        name: user.name,
        email: 'Email não disponível', // In production, you'd need a server function to get emails
        role: (user.user_roles as any)?.[0]?.role || 'student',
        created_at: new Date().toISOString()
      })) || [];

      setUsers(formattedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) {
        toast({
          title: "Erro",
          description: "Não foi possível atualizar o papel do usuário.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Sucesso",
        description: "Papel do usuário atualizado com sucesso!",
      });

      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="w-4 h-4" />;
      case 'producer':
        return <User className="w-4 h-4" />;
      case 'student':
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'producer':
        return 'default';
      case 'student':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
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

  if (userRole !== 'admin') {
    return (
      <div className="min-h-screen bg-overlay flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acesso Negado</h1>
          <p className="text-muted-foreground mb-6">Apenas administradores podem acessar esta página.</p>
          <Button onClick={() => navigate('/')} className="gradient-primary text-white">
            Voltar ao Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-overlay">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-foreground hover:text-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <UsersIcon className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Gerenciar Usuários</h1>
        </div>

        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Usuários do Sistema</CardTitle>
            <CardDescription className="text-muted-foreground">
              Gerencie os papéis e permissões dos usuários
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Carregando usuários...</p>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Nenhum usuário encontrado.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 border border-border/30">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                        <span className="text-sm font-bold text-white">
                          {user.name?.charAt(0)?.toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground">{user.name || 'Usuário sem nome'}</h3>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Badge variant={getRoleBadgeVariant(user.role)} className="flex items-center space-x-1">
                        {getRoleIcon(user.role)}
                        <span>{getRoleLabel(user.role)}</span>
                      </Badge>
                      
                      <Select
                        value={user.role}
                        onValueChange={(value: UserRole) => updateUserRole(user.id, value)}
                      >
                        <SelectTrigger className="w-[140px] bg-input border-border">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="student">Estudante</SelectItem>
                          <SelectItem value="producer">Produtor</SelectItem>
                          <SelectItem value="admin">Administrador</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}