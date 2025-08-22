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
  ((SELECT id FROM courses WHERE title = 'Produção de Conteúdo'), 'Bancos de imagens e vídeos livres de direitos', 'Recursos gratuitos para enriquecer seu conteúdo.', 3)

ON CONFLICT (course_id, order_index) DO NOTHING;