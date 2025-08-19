import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export default function NewCourse() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    is_published: true,
    is_extra: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('courses')
        .insert([
          {
            ...formData,
            created_by: user.id
          }
        ]);

      if (error) {
        toast({
          title: "Erro",
          description: "Não foi possível criar o curso.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Sucesso",
          description: "Curso criado com sucesso!",
        });
        navigate('/');
      }
    } catch (error) {
      console.error('Error creating course:', error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro inesperado.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-overlay">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center space-x-4 mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="text-foreground hover:text-accent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Novo Curso</h1>
        </div>

        <Card className="gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="text-foreground">Criar Novo Curso</CardTitle>
            <CardDescription className="text-muted-foreground">
              Preencha as informações básicas do curso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground">Título do Curso</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Digite o título do curso"
                  required
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">Descrição</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descreva o conteúdo do curso"
                  rows={4}
                  className="bg-input border-border text-foreground"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                />
                <Label htmlFor="published" className="text-foreground">Publicar curso</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="extra"
                  checked={formData.is_extra}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_extra: checked })}
                />
                <Label htmlFor="extra" className="text-foreground">Curso extra</Label>
              </div>

              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/')}
                  className="border-border text-foreground hover:bg-secondary"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="gradient-primary text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? 'Criando...' : 'Criar Curso'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}