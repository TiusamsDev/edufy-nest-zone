import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Mic, Play, Download, Volume2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AIVoice = () => {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("feminina-brasileira");
  const [speed, setSpeed] = useState([1]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const voices = [
    { value: "feminina-brasileira", label: "Feminina Brasileira" },
    { value: "masculina-brasileira", label: "Masculina Brasileira" },
    { value: "feminina-formal", label: "Feminina Formal" },
    { value: "masculina-formal", label: "Masculino Formal" },
    { value: "infantil", label: "Infantil" },
    { value: "robotica", label: "Robótica" }
  ];

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, digite o texto para narração",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setAudioUrl("https://www.soundjay.com/misc/sounds/bell-ringing-05.wav");
      
      toast({
        title: "Sucesso!",
        description: "Narração gerada com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Falha ao gerar narração. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Mic className="w-8 h-8 text-blue-500" />
          Narração IA
        </h1>
        <p className="text-muted-foreground">
          Transforme texto em narração profissional usando inteligência artificial.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-blue-500" />
              Configurações
            </CardTitle>
            <CardDescription>
              Configure os parâmetros da narração
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="text">Texto para Narração</Label>
              <Textarea
                id="text"
                placeholder="Digite ou cole o texto que será narrado..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="min-h-[150px] mt-2"
              />
              <div className="text-xs text-muted-foreground mt-1">
                {text.length} caracteres
              </div>
            </div>

            <div>
              <Label htmlFor="voice">Tipo de Voz</Label>
              <Select value={voice} onValueChange={setVoice}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Selecione o tipo de voz" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map((v) => (
                    <SelectItem key={v.value} value={v.value}>
                      {v.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="speed">Velocidade: {speed[0]}x</Label>
              <Slider
                id="speed"
                min={0.5}
                max={2}
                step={0.1}
                value={speed}
                onValueChange={setSpeed}
                className="mt-2"
              />
            </div>

            <Button 
              onClick={handleGenerate} 
              disabled={isGenerating || !text.trim()}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Mic className="w-4 h-4 mr-2 animate-pulse" />
                  Gerando Narração...
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 mr-2" />
                  Gerar Narração
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Preview da Narração</CardTitle>
            <CardDescription>
              Ouça e baixe sua narração gerada
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!audioUrl ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Mic className="w-16 h-16 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">
                  Nenhuma narração ainda
                </h3>
                <p className="text-muted-foreground">
                  Digite um texto e clique em "Gerar Narração" para começar
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <audio controls className="w-full">
                    <source src={audioUrl} type="audio/wav" />
                    Seu navegador não suporta o elemento de áudio.
                  </audio>
                </div>
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Play className="w-4 h-4 mr-2" />
                    Reproduzir
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Baixar
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p><strong>Voz:</strong> {voices.find(v => v.value === voice)?.label}</p>
                  <p><strong>Velocidade:</strong> {speed[0]}x</p>
                  <p><strong>Duração estimada:</strong> {Math.ceil(text.length / 150 / speed[0])} segundos</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIVoice;