-- Make created_by nullable and insert sample courses
ALTER TABLE public.courses ALTER COLUMN created_by DROP NOT NULL;

-- Insert sample courses data
INSERT INTO public.courses (title, description, is_extra) VALUES
('Fundamentos dos Canais Dark', 'O que é um canal dark e por que ele funciona. Nichos mais lucrativos e menos concorridos. Como escolher seu nicho com base em CPM e demanda. Exemplos reais de canais dark de sucesso.', false),
('Criando seu Canal', 'Criando uma conta Google do zero. Configuração completa do canal (nome, logo, banner). Ferramentas para identidade visual (Canva, Photoshop). Configurações e boas práticas do YouTube.', false),
('Produção de Conteúdo', 'Onde encontrar ideias e roteiros prontos. Criando roteiros com IA. Narrando sem aparecer (voz real ou IA). Bancos de imagens e vídeos livres de direitos.', false),
('Edição de Vídeos', 'Introdução ao CapCut (mobile e desktop). Cortes dinâmicos e legendas automáticas. Efeitos e transições para retenção. Otimização de qualidade para o YouTube.', false),
('Publicação Estratégica', 'Como postar vídeos do jeito certo (título, descrição, tags). Criando thumbnails atrativas. Horários ideais para postar. Playlists e telas finais para retenção.', false),
('Crescimento e Algoritmo', 'Como o algoritmo recomenda vídeos. Técnicas para aumentar CTR e retenção. SEO no YouTube (palavras-chave e tendências). Shorts vs vídeos longos.', false),
('Monetização e Escala', 'Requisitos para monetizar. Como aumentar o CPM. Outras formas de ganhar (afiliados, produtos digitais). Escalando com múltiplos canais.', false),
('Hacks e Segredos', 'Criando vídeos em massa com automação. Usando IA para acelerar produção. Fontes de músicas sem copyright. Como evitar strikes e banimentos.', true);