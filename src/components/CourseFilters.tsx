import { Search, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CourseFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedLevel: string;
  onLevelChange: (value: string) => void;
  showFeaturedOnly: boolean;
  onFeaturedToggle: () => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
}

const categoryOptions = [
  { value: 'all', label: 'Todas as Categorias' },
  { value: 'fundamentos', label: 'Fundamentos' },
  { value: 'criacao-canal', label: 'Criação de Canal' },
  { value: 'monetizacao', label: 'Monetização' },
  { value: 'geral', label: 'Geral' },
];

const levelOptions = [
  { value: 'all', label: 'Todos os Níveis' },
  { value: 'iniciante', label: 'Iniciante' },
  { value: 'intermediario', label: 'Intermediário' },
  { value: 'avancado', label: 'Avançado' },
];

export function CourseFilters({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedLevel,
  onLevelChange,
  showFeaturedOnly,
  onFeaturedToggle,
  onClearFilters,
  hasActiveFilters,
}: CourseFiltersProps) {
  return (
    <div className="space-y-4 mb-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Buscar cursos..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-card border-border/50 focus:border-accent/50"
        />
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filtros:</span>
        </div>

        {/* Category Filter */}
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger className="w-[180px] bg-card border-border/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Level Filter */}
        <Select value={selectedLevel} onValueChange={onLevelChange}>
          <SelectTrigger className="w-[160px] bg-card border-border/50">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {levelOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Featured Toggle */}
        <Button
          variant={showFeaturedOnly ? "default" : "outline"}
          onClick={onFeaturedToggle}
          size="sm"
          className="text-xs"
        >
          Apenas Destaques
        </Button>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={onClearFilters}
            size="sm"
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            <X className="w-3 h-3 mr-1" />
            Limpar Filtros
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {searchTerm && (
            <Badge variant="secondary" className="text-xs">
              Busca: "{searchTerm}"
            </Badge>
          )}
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="text-xs">
              Categoria: {categoryOptions.find(c => c.value === selectedCategory)?.label}
            </Badge>
          )}
          {selectedLevel !== 'all' && (
            <Badge variant="secondary" className="text-xs">
              Nível: {levelOptions.find(l => l.value === selectedLevel)?.label}
            </Badge>
          )}
          {Boolean(showFeaturedOnly) && (
            <Badge variant="secondary" className="text-xs">
              Apenas Destaques
            </Badge>
          )}
        </div>
      )}
    </div>
  );
}