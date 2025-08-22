import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, TrendingUp, Copy, Target } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const SEOKeywords = () => {
  const [topic, setTopic] = useState("");
  const [generatedTitle, setGeneratedTitle] = useState("");
  const [generatedDescription, setGeneratedDescription] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite o tópico do seu vídeo",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulação de dados gerados
      setGeneratedTitle(`Como ${topic}: Guia Completo 2024 | Dicas Profissionais`);
      setGeneratedDescription(`Descubra tudo sobre ${topic} neste guia completo! Aprenda as melhores técnicas, dicas profissionais e estratégias que realmente funcionam. Perfect para iniciantes e avançados. 🚀 INSCREVA-SE para mais conteúdo!\n\n📱 Redes sociais:\n- Instagram: @seucanal\n- TikTok: @seucanal\n\n⏰ Timestamps:\n00:00 - Introdução\n02:30 - Conceitos básicos\n05:15 - Técnicas avançadas\n08:45 - Conclusão\n\n#${topic.replace(/\s+/g, '')} #Tutorial #Dicas #2024`);
      
      setKeywords([
        topic.toLowerCase(),
        `${topic} tutorial`,
        `como ${topic}`,
        `${topic} dicas`,
        `${topic} guia`,
        `${topic} passo a passo`,
        `${topic} iniciantes`,
        `melhor ${topic}`,
        `${topic} 2024`,
        `${topic} profissional`
      ]);
      
      setTags([
        topic.replace(/\s+/g, ''),
        'tutorial',
        'dicas',
        'guia',
        'passoapasso',
        'iniciantes',
        '2024',
        'profissional',
        'youtube',
        'aprenda'
      ]);
      
      toast({
        title: "Sucesso!",
        description: "SEO otimizado gerado com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao gerar SEO. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: `${type} copiado para a área de transferência`,
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Search className="w-8 h-8 text-green-500" />
          SEO e Palavras-chave
        </h1>
        <p className="text-muted-foreground">
          Otimize seus vídeos com títulos, descrições e tags que rankeiam no YouTube.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Entrada */}
        <div className="lg:col-span-1">
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-green-500" />
                Configuração
              </CardTitle>
              <CardDescription>
                Digite o tópico do seu vídeo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="topic">Tópico do Vídeo</Label>
                <Input
                  id="topic"
                  placeholder="Ex: fazer brigadeiro, programar em Python, tocar violão..."
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="mt-2"
                />
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || !topic.trim()}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Search className="w-4 h-4 mr-2 animate-spin" />
                    Gerando SEO...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Gerar SEO Otimizado
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-2 space-y-6">
          {/* Título */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Título Otimizado
                {generatedTitle && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(generatedTitle, "Título")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                )}
              </CardTitle>
              <CardDescription>
                Título otimizado para SEO (max 100 caracteres)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedTitle ? (
                <div className="space-y-2">
                  <p className="text-foreground font-medium">{generatedTitle}</p>
                  <p className="text-xs text-muted-foreground">
                    {generatedTitle.length}/100 caracteres
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  Digite um tópico e clique em "Gerar SEO Otimizado"
                </p>
              )}
            </CardContent>
          </Card>

          {/* Descrição */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Descrição Otimizada
                {generatedDescription && (
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(generatedDescription, "Descrição")}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copiar
                  </Button>
                )}
              </CardTitle>
              <CardDescription>
                Descrição completa com call-to-actions e timestamps
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedDescription ? (
                <Textarea
                  value={generatedDescription}
                  readOnly
                  className="min-h-[200px] font-mono text-sm"
                />
              ) : (
                <p className="text-muted-foreground italic">
                  A descrição aparecerá aqui após gerar o SEO
                </p>
              )}
            </CardContent>
          </Card>

          {/* Palavras-chave */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Palavras-chave Principais</CardTitle>
              <CardDescription>
                Keywords para otimização no YouTube
              </CardDescription>
            </CardHeader>
            <CardContent>
              {keywords.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword, index) => (
                    <Badge 
                      key={index} 
                      variant="secondary"
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => copyToClipboard(keyword, "Palavra-chave")}
                    >
                      {keyword}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  As palavras-chave aparecerão aqui
                </p>
              )}
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="gradient-card">
            <CardHeader>
              <CardTitle>Tags do YouTube</CardTitle>
              <CardDescription>
                Tags otimizadas para descoberta
              </CardDescription>
            </CardHeader>
            <CardContent>
              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline"
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => copyToClipboard(tag, "Tag")}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground italic">
                  As tags aparecerão aqui
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SEOKeywords;