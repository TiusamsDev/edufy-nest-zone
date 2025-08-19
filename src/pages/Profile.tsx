import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Save, User, Shield, GraduationCap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const navigate = useNavigate();
  const { user, profile, userRole } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    avatar_url: ""
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        avatar_url: profile.avatar_url || ""
      });
    }
  }, [profile]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update(formData)
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Erro",
          description: "Não foi possível atualizar o perfil.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sucesso",
          description: "Perfil atualizado com sucesso!",
        });
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = () => {
    switch (userRole) {
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

  const getRoleLabel = () => {
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

  const getRoleBadgeVariant = () => {
    switch (userRole) {
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

  return (
    <div className="min-h-screen bg-overlay">
      <div className="max-w-2xl mx-auto p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-foreground hover:text-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Meu Perfil</h1>
        </div>

        <div className="space-y-6">
          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                <User className="w-5 h-5" />
                <span>Informações do Perfil</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Atualize suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">E-mail</Label>
                  <Input
                    id="email"
                    value={user?.email || ""}
                    disabled
                    className="bg-input border-border text-muted-foreground"
                  />
                  <p className="text-xs text-muted-foreground">O e-mail não pode ser alterado</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">Nome</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Digite seu nome"
                    className="bg-input border-border text-foreground"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="avatar_url" className="text-foreground">URL do Avatar</Label>
                  <Input
                    id="avatar_url"
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    placeholder="https://exemplo.com/avatar.jpg"
                    className="bg-input border-border text-foreground"
                  />
                </div>

                <div className="flex justify-end">
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="gradient-primary text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {isLoading ? 'Salvando...' : 'Salvar Alterações'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="gradient-card border-border/50">
            <CardHeader>
              <CardTitle className="text-foreground flex items-center space-x-2">
                {getRoleIcon()}
                <span>Papel no Sistema</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Seu nível de acesso atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-foreground font-medium">Papel Atual</p>
                  <p className="text-sm text-muted-foreground">
                    Define suas permissões no sistema
                  </p>
                </div>
                <Badge variant={getRoleBadgeVariant()} className="flex items-center space-x-1">
                  {getRoleIcon()}
                  <span>{getRoleLabel()}</span>
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}