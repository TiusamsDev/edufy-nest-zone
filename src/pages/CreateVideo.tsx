import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Video, Play, Download, Clock, Film } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const CreateVideo = () => {
  const [script, setScript] = useState("");
  const [duration, setDuration] = useState("30");
  const [style, setStyle] = useState("professional");
  const [voiceType, setVoiceType] = useState("female");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideos, setGeneratedVideos] = useState<any[]>([]);
  const { toast } = useToast();

  const styles = [
    { value: "professional", label: "Profissional" },
    { value: "casual", label: "Casual" },
    { value: "educational", label: "Educativo" },
    { value: "promotional", label: "Promocional" },
    { value: "storytelling", label: "Narrativo" },
    { value: "animated", label: "Animado" }
  ];

  const durations = [
    { value: "15", label: "15 segundos" },
    { value: "30", label: "30 segundos" },
    { value: "60", label: "1 minuto" },
    { value: "120", label: "2 minutos" },
    { value: "300", label: "5 minutos" }
  ];

  const voiceTypes = [
    { value: "female", label: "Voz Feminina" },
    { value: "male", label: "Voz Masculina" },
    { value: "neutral", label: "Voz Neutra" }
  ];

  const scriptSuggestions = [
    "Apresentação de produto inovador",
    "Tutorial rápido sobre tecnologia",
    "Dicas de produtividade para trabalho",
    "Introdução sobre sustentabilidade",
    "Review de aplicativo móvel"
  ];

  const handleGenerate = async () => {
    if (!script.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite um roteiro para o vídeo",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      // Simular geração de vídeo
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      const newVideo = {
        id: Date.now(),
        title: script.substring(0, 50) + "...",
        thumbnail: `https://picsum.photos/320/180?random=${Date.now()}`,
        duration: duration,
        createdAt: new Date().toLocaleDateString()
      };
      
      setGeneratedVideos(prev => [newVideo, ...prev]);
      
      toast({
        title: "Sucesso!",
        description: "Vídeo gerado com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao gerar vídeo. Tente novamente.",
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
          <Video className="w-8 h-8 text-primary" />
          Criar Vídeo com IA
        </h1>
        <p className="text-muted-foreground">
          Crie vídeos profissionais automaticamente. Forneça um roteiro e deixe a IA criar um vídeo completo com narração e imagens.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário de Criação */}
        <div className="lg:col-span-1">
          <Card className="gradient-card animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Film className="w-5 h-5 text-primary" />
                Configurações do Vídeo
              </CardTitle>
              <CardDescription>
                Configure os parâmetros para gerar seu vídeo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="script">Roteiro do Vídeo</Label>
                <Textarea
                  id="script"
                  placeholder="Digite o roteiro ou descrição do seu vídeo..."
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  className="min-h-[120px] mt-2"
                />
              </div>

              <div>
                <Label htmlFor="duration">Duração</Label>
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
                <Label htmlFor="style">Estilo do Vídeo</Label>
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
                <Label htmlFor="voiceType">Tipo de Voz</Label>
                <Select value={voiceType} onValueChange={setVoiceType}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione o tipo de voz" />
                  </SelectTrigger>
                  <SelectContent>
                    {voiceTypes.map((v) => (
                      <SelectItem key={v.value} value={v.value}>
                        {v.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleGenerate} 
                disabled={isGenerating || !script.trim()}
                className="w-full"
              >
                {isGenerating ? (
                  <>
                    <Film className="w-4 h-4 mr-2 animate-spin" />
                    Gerando Vídeo...
                  </>
                ) : (
                  <>
                    <Film className="w-4 h-4 mr-2" />
                    Gerar Vídeo
                  </>
                )}
              </Button>

              <div className="pt-4">
                <Label className="text-sm font-medium">Sugestões de Roteiro:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {scriptSuggestions.map((suggestion, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="cursor-pointer hover:bg-accent text-xs"
                      onClick={() => setScript(suggestion)}
                    >
                      {suggestion}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Lista de Vídeos */}
        <div className="lg:col-span-2">
          <Card className="gradient-card animate-fade-in">
            <CardHeader>
              <CardTitle>Vídeos Gerados</CardTitle>
              <CardDescription>
                Seus vídeos criados aparecerão aqui
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedVideos.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Video className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    Nenhum vídeo ainda
                  </h3>
                  <p className="text-muted-foreground">
                    Digite um roteiro e clique em "Gerar Vídeo" para começar
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {generatedVideos.map((video) => (
                    <div key={video.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:bg-accent/20 transition-colors animate-scale-in">
                      <div className="relative">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-24 h-16 object-cover rounded border border-border"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Play className="w-6 h-6 text-white drop-shadow-lg" />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{video.title}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {video.duration}s
                          </span>
                          <span>{video.createdAt}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Play className="w-4 h-4 mr-2" />
                          Visualizar
                        </Button>
                        <Button variant="outline" size="sm">
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

export default CreateVideo;