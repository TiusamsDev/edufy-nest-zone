import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Copy, Download, Sparkles, BookOpen } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CreateScript = () => {
  const [topic, setTopic] = useState("");
  const [scriptType, setScriptType] = useState("youtube");
  const [duration, setDuration] = useState("5");
  const [tone, setTone] = useState("friendly");
  const [targetAudience, setTargetAudience] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScripts, setGeneratedScripts] = useState<any[]>([]);
  const { toast } = useToast();

  const scriptTypes = [
    { value: "youtube", label: "Vídeo YouTube" },
    { value: "instagram", label: "Reels/Stories" },
    { value: "tiktok", label: "TikTok" },
    { value: "course", label: "Aula/Curso" },
    { value: "presentation", label: "Apresentação" },
    { value: "podcast", label: "Podcast" },
    { value: "advertisement", label: "Anúncio" }
  ];

  const durations = [
    { value: "1", label: "1 minuto" },
    { value: "3", label: "3 minutos" },
    { value: "5", label: "5 minutos" },
    { value: "10", label: "10 minutos" },
    { value: "15", label: "15 minutos" },
    { value: "30", label: "30 minutos" }
  ];

  const tones = [
    { value: "friendly", label: "Amigável" },
    { value: "professional", label: "Profissional" },
    { value: "casual", label: "Casual" },
    { value: "enthusiastic", label: "Entusiasmado" },
    { value: "educational", label: "Educativo" },
    { value: "persuasive", label: "Persuasivo" }
  ];

  const topicSuggestions = [
    "Como criar conteúdo viral",
    "Dicas de produtividade",
    "Introdução ao marketing digital",
    "Tutorial de edição de vídeo",
    "Review de produto tech",
    "Estratégias de crescimento pessoal"
  ];

  const sampleScript = `# Roteiro: Como criar conteúdo viral

## Introdução (0:00 - 0:30)
Olá pessoal! Hoje vou compartilhar com vocês os segredos para criar conteúdo que realmente engaja e viraliza nas redes sociais.

## Desenvolvimento (0:30 - 4:00)
### Ponto 1: Conheça seu público
- Primeiro, você precisa entender quem é sua audiência
- Quais são os problemas que eles enfrentam?
- O que eles realmente querem ver?

### Ponto 2: Crie valor genuíno
- Sempre se pergunte: "Isso ajuda minha audiência?"
- Compartilhe experiências reais
- Seja autêntico e transparente

### Ponto 3: Use técnicas de storytelling
- Comece com um gancho forte
- Desenvolva uma narrativa envolvente
- Termine com uma call-to-action clara

## Conclusão (4:00 - 5:00)
Lembrem-se: consistência é a chave. Apliquem essas dicas e vejam seus números crescerem! Deixem nos comentários qual dessas estratégias vocês vão testar primeiro.

## Call-to-Action
Não esqueçam de curtir o vídeo, se inscrever no canal e ativar o sininho para não perder nenhum conteúdo!`;

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite um tópico para o roteiro",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Simular geração de roteiro
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const newScript = {
        id: Date.now(),
        title: topic,
        type: scriptTypes.find(t => t.value === scriptType)?.label,
        duration: duration,
        tone: tones.find(t => t.value === tone)?.label,
        content: sampleScript,
        createdAt: new Date().toLocaleDateString(),
        wordCount: sampleScript.split(' ').length
      };
      
      setGeneratedScripts(prev => [newScript, ...prev]);
      
      toast({
        title: "Sucesso!",
        description: "Roteiro gerado com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao gerar roteiro. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copiado!",
      description: "Roteiro copiado para a área de transferência",
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <FileText className="w-8 h-8 text-primary" />
          Criar Roteiro com IA
        </h1>
        <p className="text-muted-foreground">
          Gere roteiros profissionais para vídeos, aulas, apresentações e muito mais. Perfeito para criadores de conteúdo.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Criação */}
        <div className="lg:col-span-1">
          <Card className="gradient-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                Configurações do Roteiro
              </CardTitle>
              <CardDescription>
                Configure os parâmetros para gerar seu roteiro
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="topic">Tópico/Assunto</Label>
                <Input
                  id="topic"
                  placeholder="Ex: Como criar thumbnails chamativas"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="scriptType">Tipo de Roteiro</Label>
                <Select value={scriptType} onValueChange={setScriptType}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {scriptTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="duration">Duração Estimada</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione a duração" />
                  </SelectTrigger>
                  <SelectContent>
                    {durations.map((d) => (
                      <SelectItem key={d.value} value={d.value}>
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tone">Tom de Voz</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione o tom" />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {t.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="targetAudience">Público-alvo (opcional)</Label>
                <Input
                  id="targetAudience"
                  placeholder="Ex: Jovens de 18-25 anos"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
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
                    <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                    Gerando Roteiro...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Gerar Roteiro
                  </>
                )}
              </Button>

              <div className="pt-4">
                <Label className="text-sm font-medium">Sugestões de Tópico:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {topicSuggestions.map((suggestion, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="cursor-pointer hover:bg-accent text-xs"
                      onClick={() => setTopic(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Roteiros */}
        <div className="lg:col-span-2">
          <Card className="gradient-card animate-fade-in">
            <CardHeader>
              <CardTitle>Roteiros Gerados</CardTitle>
              <CardDescription>
                Seus roteiros criados aparecerão aqui
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedScripts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <FileText className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Nenhum roteiro ainda
                  </h3>
                  <p className="text-muted-foreground">
                    Digite um tópico e clique em "Gerar Roteiro" para começar
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {generatedScripts.map((script) => (
                    <div key={script.id} className="border border-border rounded-lg p-6 animate-scale-in">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-foreground text-lg">{script.title}</h4>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span>{script.type}</span>
                            <span>{script.duration} min</span>
                            <span>{script.tone}</span>
                            <span>{script.wordCount} palavras</span>
                            <span>{script.createdAt}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => copyToClipboard(script.content)}
                          >
                            <Copy className="w-4 h-4 mr-2" />
                            Copiar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Baixar
                          </Button>
                        </div>
                      </div>
                      
                      <div className="bg-muted/30 rounded-lg p-4 max-h-96 overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm text-foreground font-mono">
                          {script.content}
                        </pre>
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

export default CreateScript;