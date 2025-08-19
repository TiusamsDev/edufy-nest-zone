import { CourseCard } from "./CourseCard";

interface Course {
  id: string;
  title: string;
  description: string;
  isExtra?: boolean;
  lessons: string[];
}

interface DashboardProps {
  userType: 'admin' | 'producer' | 'student';
  onCourseClick: (courseId: string) => void;
}

const courses: Course[] = [
  {
    id: "1",
    title: "Curso 1 — Fundamentos dos Canais Dark",
    description: "Aprenda os conceitos fundamentais dos canais dark e como eles funcionam no YouTube.",
    lessons: [
      "O que é um canal dark e por que ele funciona",
      "Nichos mais lucrativos e menos concorridos",
      "Como escolher seu nicho com base em CPM e demanda",
      "Exemplos reais de canais dark de sucesso"
    ]
  },
  {
    id: "2",
    title: "Curso 2 — Criando seu Canal",
    description: "Passo a passo completo para criar e configurar seu canal do zero.",
    lessons: [
      "Criando uma conta Google do zero",
      "Configuração completa do canal (nome, logo, banner)",
      "Ferramentas para identidade visual (Canva, Photoshop)",
      "Configurações e boas práticas do YouTube"
    ]
  },
  {
    id: "3",
    title: "Curso 3 — Produção de Conteúdo",
    description: "Domine a arte de criar conteúdo envolvente sem aparecer no vídeo.",
    lessons: [
      "Onde encontrar ideias e roteiros prontos",
      "Criando roteiros com IA",
      "Narrando sem aparecer (voz real ou IA)",
      "Bancos de imagens e vídeos livres de direitos"
    ]
  },
  {
    id: "4",
    title: "Curso 4 — Edição de Vídeos",
    description: "Aprenda técnicas profissionais de edição para manter a audiência engajada.",
    lessons: [
      "Introdução ao CapCut (mobile e desktop)",
      "Cortes dinâmicos e legendas automáticas",
      "Efeitos e transições para retenção",
      "Otimização de qualidade para o YouTube"
    ]
  },
  {
    id: "5",
    title: "Curso 5 — Publicação Estratégica",
    description: "Estratégias avançadas para maximizar o alcance dos seus vídeos.",
    lessons: [
      "Como postar vídeos do jeito certo (título, descrição, tags)",
      "Criando thumbnails atrativas",
      "Horários ideais para postar",
      "Playlists e telas finais para retenção"
    ]
  },
  {
    id: "6",
    title: "Curso 6 — Crescimento e Algoritmo",
    description: "Entenda como funciona o algoritmo e como usar isso a seu favor.",
    lessons: [
      "Como o algoritmo recomenda vídeos",
      "Técnicas para aumentar CTR e retenção",
      "SEO no YouTube (palavras-chave e tendências)",
      "Shorts vs vídeos longos"
    ]
  },
  {
    id: "7",
    title: "Curso 7 — Monetização e Escala",
    description: "Transforme seus vídeos em uma fonte de renda consistente.",
    lessons: [
      "Requisitos para monetizar",
      "Como aumentar o CPM",
      "Outras formas de ganhar (afiliados, produtos digitais)",
      "Escalando com múltiplos canais"
    ]
  },
  {
    id: "8",
    title: "Curso Extra — Hacks e Segredos",
    description: "Técnicas avançadas e segredos dos profissionais para acelerar resultados.",
    isExtra: true,
    lessons: [
      "Criando vídeos em massa com automação",
      "Usando IA para acelerar produção",
      "Fontes de músicas sem copyright",
      "Como evitar strikes e banimentos"
    ]
  }
];

export function Dashboard({ userType, onCourseClick }: DashboardProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Bem-vindo ao Dark Club Educação
          </h1>
          <p className="text-muted-foreground">
            Domine a criação de canais dark no YouTube com nossos cursos especializados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard 
              key={course.id} 
              course={course} 
              onCourseClick={onCourseClick}
            />
          ))}
        </div>
      </div>
    </main>
  );
}