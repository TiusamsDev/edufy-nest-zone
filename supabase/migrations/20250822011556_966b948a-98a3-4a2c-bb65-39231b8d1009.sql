-- Populate lessons table with sample data if empty
INSERT INTO public.lessons (course_id, title, content, order_index) VALUES
  -- Fundamentos dos Canais Dark
  ((SELECT id FROM courses WHERE title = 'Fundamentos dos Canais Dark'), 'O que é um canal dark e por que ele funciona', 'Introdução aos conceitos fundamentais dos canais dark no YouTube.', 0),
  ((SELECT id FROM courses WHERE title = 'Fundamentos dos Canais Dark'), 'Nichos mais lucrativos e menos concorridos', 'Análise detalhada dos nichos mais rentáveis para canais dark.', 1),
  ((SELECT id FROM courses WHERE title = 'Fundamentos dos Canais Dark'), 'Como escolher seu nicho com base em CPM e demanda', 'Estratégias para selecionar o nicho ideal baseado em dados.', 2),
  ((SELECT id FROM courses WHERE title = 'Fundamentos dos Canais Dark'), 'Exemplos reais de canais dark de sucesso', 'Casos de estudo de canais que alcançaram o sucesso.', 3),
  
  -- Criando seu Canal
  ((SELECT id FROM courses WHERE title = 'Criando seu Canal'), 'Criando uma conta Google do zero', 'Passo a passo para criar uma nova conta Google.', 0),
  ((SELECT id FROM courses WHERE title = 'Criando seu Canal'), 'Configuração completa do canal', 'Como configurar nome, logo, banner e outras configurações.', 1),
  ((SELECT id FROM courses WHERE title = 'Criando seu Canal'), 'Ferramentas para identidade visual', 'Usando Canva, Photoshop e outras ferramentas.', 2),
  ((SELECT id FROM courses WHERE title = 'Criando seu Canal'), 'Configurações e boas práticas do YouTube', 'Otimizações essenciais para seu canal.', 3),
  
  -- Produção de Conteúdo
  ((SELECT id FROM courses WHERE title = 'Produção de Conteúdo'), 'Onde encontrar ideias e roteiros prontos', 'Fontes confiáveis para inspiração de conteúdo.', 0),
  ((SELECT id FROM courses WHERE title = 'Produção de Conteúdo'), 'Criando roteiros com IA', 'Como usar inteligência artificial para criar roteiros.', 1),
  ((SELECT id FROM courses WHERE title = 'Produção de Conteúdo'), 'Narrando sem aparecer', 'Técnicas de narração com voz real ou IA.', 2),
  ((SELECT id FROM courses WHERE title = 'Produção de Conteúdo'), 'Bancos de imagens e vídeos livres de direitos', 'Recursos gratuitos para enriquecer seu conteúdo.', 3),
  
  -- Edição de Vídeos
  ((SELECT id FROM courses WHERE title = 'Edição de Vídeos'), 'Introdução ao CapCut', 'Primeiros passos com o editor CapCut.', 0),
  ((SELECT id FROM courses WHERE title = 'Edição de Vídeos'), 'Cortes dinâmicos e legendas automáticas', 'Técnicas para manter a audiência engajada.', 1),
  ((SELECT id FROM courses WHERE title = 'Edição de Vídeos'), 'Efeitos e transições para retenção', 'Como usar efeitos para aumentar o tempo de assistência.', 2),
  ((SELECT id FROM courses WHERE title = 'Edição de Vídeos'), 'Otimização de qualidade para o YouTube', 'Configurações ideais de exportação.', 3),
  
  -- Publicação Estratégica
  ((SELECT id FROM courses WHERE title = 'Publicação Estratégica'), 'Como postar vídeos do jeito certo', 'Título, descrição e tags otimizadas.', 0),
  ((SELECT id FROM courses WHERE title = 'Publicação Estratégica'), 'Criando thumbnails atrativas', 'Design de miniaturas que geram cliques.', 1),
  ((SELECT id FROM courses WHERE title = 'Publicação Estratégica'), 'Horários ideais para postar', 'Quando publicar para máximo alcance.', 2),
  ((SELECT id FROM courses WHERE title = 'Publicação Estratégica'), 'Playlists e telas finais para retenção', 'Estratégias para manter espectadores no canal.', 3),
  
  -- Crescimento e Algoritmo
  ((SELECT id FROM courses WHERE title = 'Crescimento e Algoritmo'), 'Como o algoritmo recomenda vídeos', 'Entendendo o funcionamento do YouTube.', 0),
  ((SELECT id FROM courses WHERE title = 'Crescimento e Algoritmo'), 'Técnicas para aumentar CTR e retenção', 'Métricas fundamentais para o sucesso.', 1),
  ((SELECT id FROM courses WHERE title = 'Crescimento e Algoritmo'), 'SEO no YouTube', 'Palavras-chave e tendências.', 2),
  ((SELECT id FROM courses WHERE title = 'Crescimento e Algoritmo'), 'Shorts vs vídeos longos', 'Estratégias para diferentes formatos.', 3),
  
  -- Monetização e Escala
  ((SELECT id FROM courses WHERE title = 'Monetização e Escala'), 'Requisitos para monetizar', 'Como habilitar a monetização do canal.', 0),
  ((SELECT id FROM courses WHERE title = 'Monetização e Escala'), 'Como aumentar o CPM', 'Estratégias para maximizar receita por visualização.', 1),
  ((SELECT id FROM courses WHERE title = 'Monetização e Escala'), 'Outras formas de ganhar', 'Afiliados e produtos digitais.', 2),
  ((SELECT id FROM courses WHERE title = 'Monetização e Escala'), 'Escalando com múltiplos canais', 'Construindo um império de canais.', 3),
  
  -- Hacks e Segredos
  ((SELECT id FROM courses WHERE title = 'Hacks e Segredos'), 'Criando vídeos em massa com automação', 'Ferramentas para produção em escala.', 0),
  ((SELECT id FROM courses WHERE title = 'Hacks e Segredos'), 'Usando IA para acelerar produção', 'Inteligência artificial na criação de conteúdo.', 1),
  ((SELECT id FROM courses WHERE title = 'Hacks e Segredos'), 'Fontes de músicas sem copyright', 'Onde encontrar trilhas sonoras livres.', 2),
  ((SELECT id FROM courses WHERE title = 'Hacks e Segredos'), 'Como evitar strikes e banimentos', 'Políticas do YouTube e como seguir as regras.', 3)

ON CONFLICT (course_id, order_index) DO NOTHING;