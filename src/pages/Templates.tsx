import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Layout, Play, Download, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const { toast } = useToast();

  const categories = [
    { value: "all", label: "Todos" },
    { value: "intro", label: "Intros" },
    { value: "outro", label: "Outros" },
    { value: "overlay", label: "Overlays" },
    { value: "lower-third", label: "Lower Thirds" },
    { value: "transition", label: "Transições" }
  ];

  const templates = [
    {
      id: 1,
      title: "Intro Gaming Neon",
      category: "intro",
      description: "Intro animada com efeitos neon para canais de gaming",
      thumbnail: "https://picsum.photos/300/200?random=1",
      duration: "5s",
      tags: ["Gaming", "Neon", "Animado"]
    },
    {
      id: 2,
      title: "Lower Third Corporativo",
      category: "lower-third",
      description: "Lower third elegante para vídeos corporativos",
      thumbnail: "https://picsum.photos/300/200?random=2",
      duration: "3s",
      tags: ["Corporativo", "Elegante", "Profissional"]
    },
    {
      id: 3,
      title: "Overlay de Subscribe",
      category: "overlay",
      description: "Overlay animado para lembrar de se inscrever",
      thumbnail: "https://picsum.photos/300/200?random=3",
      duration: "8s",
      tags: ["Subscribe", "Animado", "Call-to-Action"]
    },
    {
      id: 4,
      title: "Intro Minimalista",
      category: "intro",
      description: "Intro clean e minimalista para qualquer tipo de conteúdo",
      thumbnail: "https://picsum.photos/300/200?random=4",
      duration: "4s",
      tags: ["Minimalista", "Clean", "Versátil"]
    },
    {
      id: 5,
      title: "Transição Smooth",
      category: "transition",
      description: "Transição suave entre cenas",
      thumbnail: "https://picsum.photos/300/200?random=5",
      duration: "2s",
      tags: ["Transição", "Suave", "Profissional"]
    },
    {
      id: 6,
      title: "Outro com CTA",
      category: "outro",
      description: "Encerramento com call-to-action para próximos vídeos",
      thumbnail: "https://picsum.photos/300/200?random=6",
      duration: "10s",
      tags: ["Outro", "CTA", "Subscribe"]
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "all" || template.category === category;
    return matchesSearch && matchesCategory;
  });

  const handleDownload = (template: any) => {
    toast({
      title: "Download iniciado",
      description: `Template "${template.title}" será baixado`,
    });
  };

  const handlePreview = (template: any) => {
    setSelectedTemplate(template);
    toast({
      title: "Preview",
      description: `Visualizando template "${template.title}"`,
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Layout className="w-8 h-8 text-purple-500" />
          Templates
        </h1>
        <p className="text-muted-foreground">
          Intros, overlays, lower thirds e muito mais para seus vídeos.
        </p>
      </div>

      {/* Filtros */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Buscar Templates</Label>
              <div className="relative mt-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Digite para buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="md:w-48">
              <Label htmlFor="category">Categoria</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Selecione categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid de Templates */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="relative">
              <img 
                src={template.thumbnail} 
                alt={template.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="secondary"
                    onClick={() => handlePreview(template)}
                  >
                    <Play className="w-4 h-4 mr-1" />
                    Preview
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleDownload(template)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
              <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                {template.duration}
              </Badge>
            </div>
            
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{template.title}</CardTitle>
              <CardDescription className="text-sm">
                {template.description}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1">
                {template.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <Layout className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Nenhum template encontrado
          </h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros ou buscar por outros termos.
          </p>
        </div>
      )}
    </div>
  );
};

export default Templates;