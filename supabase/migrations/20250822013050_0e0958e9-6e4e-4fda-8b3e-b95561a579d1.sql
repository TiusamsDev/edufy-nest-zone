-- Add category and level columns to courses table
ALTER TABLE public.courses 
ADD COLUMN category TEXT,
ADD COLUMN level TEXT CHECK (level IN ('iniciante', 'intermediario', 'avancado')),
ADD COLUMN duration_minutes INTEGER DEFAULT 0,
ADD COLUMN is_featured BOOLEAN DEFAULT false;

-- Add index for better filtering performance
CREATE INDEX idx_courses_category ON public.courses(category);
CREATE INDEX idx_courses_level ON public.courses(level);
CREATE INDEX idx_courses_featured ON public.courses(is_featured);

-- Update existing courses with sample data
UPDATE public.courses SET 
  category = CASE 
    WHEN title ILIKE '%fundamentos%' OR title ILIKE '%básico%' THEN 'fundamentos'
    WHEN title ILIKE '%canal%' OR title ILIKE '%criação%' THEN 'criacao-canal'
    WHEN title ILIKE '%monetização%' OR title ILIKE '%renda%' THEN 'monetizacao'
    WHEN title ILIKE '%avançado%' OR title ILIKE '%expert%' THEN 'avancado'
    ELSE 'geral'
  END,
  level = CASE 
    WHEN title ILIKE '%fundamentos%' OR title ILIKE '%básico%' OR title ILIKE '%iniciante%' THEN 'iniciante'
    WHEN title ILIKE '%avançado%' OR title ILIKE '%expert%' THEN 'avancado'
    ELSE 'intermediario'
  END,
  duration_minutes = CASE 
    WHEN title ILIKE '%fundamentos%' THEN 120
    WHEN title ILIKE '%canal%' THEN 180
    WHEN title ILIKE '%monetização%' THEN 150
    ELSE 90
  END,
  is_featured = CASE 
    WHEN title ILIKE '%fundamentos%' OR title ILIKE '%canal%' THEN true
    ELSE false
  END
WHERE category IS NULL;