import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface LoginFormProps {
  onLogin: (userType: 'admin' | 'producer' | 'student') => void;
}

export function LoginForm({ onLogin }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<'admin' | 'producer' | 'student'>('student');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(userType);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--gradient-primary)' }}>
      <Card className="w-full max-w-md gradient-card border-border/50">
        <CardHeader className="text-center space-y-2">
          <div className="w-16 h-16 mx-auto rounded-full gradient-primary flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">DC</span>
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Dark Club Academy
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Acesse sua conta para continuar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userType" className="text-foreground">Tipo de usuário</Label>
              <Select value={userType} onValueChange={(value: 'admin' | 'producer' | 'student') => setUserType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de usuário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">Estudante</SelectItem>
                  <SelectItem value="producer">Produtor</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">E-mail ou usuário</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border text-foreground"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-border text-foreground"
                required
              />
            </div>
            
            <Button type="submit" className="w-full gradient-primary hover:gradient-hover text-white font-medium">
              Entrar
            </Button>
            
            <div className="text-center">
              <a href="#" className="text-sm text-accent hover:text-accent/80 transition-colors">
                Esqueci minha senha
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}