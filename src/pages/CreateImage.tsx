import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Image, Download, Sparkles, Wand2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CreateImage = () => {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("realistic");
  const [size, setSize] = useState("1024x1024");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const { toast } = useToast();

  const styles = [
    { value: "realistic", label: "Realista" },
    { value: "cartoon", label: "Cartoon" },
    { value: "anime", label: "Anime" },
    { value: "oil-painting", label: "Pintura à Óleo" },
    { value: "watercolor", label: "Aquarela" },
    { value: "digital-art", label: "Arte Digital" },
    { value: "3d-render", label: "Renderização 3D" },
    { value: "minimalist", label: "Minimalista" }
  ];

  const sizes = [
    { value: "512x512", label: "512x512 (Quadrado)" },
    { value: "1024x1024", label: "1024x1024 (Quadrado)" },
    { value: "1024x768", label: "1024x768 (Paisagem)" },
    { value: "768x1024", label: "768x1024 (Retrato)" }
  ];

  const prompts = [
    "Um gato robô futurista em uma cidade cyberpunk",
    "Paisagem montanhosa ao pôr do sol com cores vibrantes",
    "Retrato de uma pessoa em estilo pop art",
    "Logo minimalista para uma empresa de tecnologia",
    "Ilustração de comida italiana em estilo aquarela",
    "Personagem de jogo em estilo anime"
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite uma descrição para a imagem",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Simular geração de imagem
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Adicionar imagem placeholder
      const newImage = `https://picsum.photos/1024/1024?random=${Date.now()}`;
      setGeneratedImages(prev => [newImage, ...prev]);
      
      toast({
        title: "Sucesso!",
        description: "Imagem gerada com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao gerar imagem. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Image className="w-8 h-8 text-primary" />
          Criar Imagem com IA
        </h1>
        <p className="text-muted-foreground">
          Gere imagens incríveis usando inteligência artificial. Descreva o que você quer e deixe a IA criar para você.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Criação */}
        <div className="lg:col-span-1">
          <Card className="gradient-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wand2 className="w-5 h-5 text-primary" />
                Configurações
              </CardTitle>
              <CardDescription>
                Configure os parâmetros para gerar sua imagem
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="prompt">Descrição da Imagem</Label>
                <Textarea
                  id="prompt"
                  placeholder="Descreva detalhadamente a imagem que você quer gerar..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[100px] mt-2"
                />
              </div>

              <div>
                <Label htmlFor="style">Estilo</Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione um estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="size">Tamanho</Label>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione o tamanho" />
                  </SelectTrigger>
                  <SelectContent>
                    {sizes.map((s) => (
                      <SelectItem key={s.value} value={s.value}>
                        {s.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || !prompt.trim()}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Gerando...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Gerar Imagem
                  </>
                )}
              </Button>

              <div className="pt-4">
                <Label className="text-sm font-medium">Sugestões de Prompt:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {prompts.map((p, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="cursor-pointer hover:bg-accent text-xs"
                      onClick={() => setPrompt(p)}
                    >
                      {p.substring(0, 30)}...
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Galeria de Imagens */}
        <div className="lg:col-span-2">
          <Card className="gradient-card animate-fade-in">
            <CardHeader>
              <CardTitle>Imagens Geradas</CardTitle>
              <CardDescription>
                Suas criações aparecerão aqui
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedImages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Image className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Nenhuma imagem ainda
                  </h3>
                  <p className="text-muted-foreground">
                    Digite uma descrição e clique em "Gerar Imagem" para começar
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedImages.map((image, index) => (
                    <div key={index} className="relative group animate-scale-in">
                      <img 
                        src={image} 
                        alt={`Imagem gerada ${index + 1}`}
                        className="w-full h-64 object-cover rounded-lg border border-border"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <Button variant="secondary" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Baixar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CreateImage;