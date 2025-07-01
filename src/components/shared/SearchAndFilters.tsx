
import React from 'react';
import { Search, Filter, SortAsc, SortDesc } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  onSortOrderChange: () => void;
  filterBy?: string;
  onFilterChange?: (value: string) => void;
  filterOptions?: { value: string; label: string }[];
  sortOptions: { value: string; label: string }[];
  placeholder?: string;
}

const SearchAndFilters = ({
  searchTerm,
  onSearchChange,
  sortBy,
  onSortChange,
  sortOrder,
  onSortOrderChange,
  filterBy,
  onFilterChange,
  filterOptions,
  sortOptions,
  placeholder = "Search..."
}: SearchAndFiltersProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6 p-4 bg-white rounded-lg border">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      
      <div className="flex gap-2">
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder={t('sortBy')} />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        <Button
          variant="outline"
          size="icon"
          onClick={onSortOrderChange}
          title={sortOrder === 'asc' ? t('ascending') : t('descending')}
        >
          {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
        </Button>
        
        {filterOptions && onFilterChange && (
          <Select value={filterBy} onValueChange={onFilterChange}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t('filter')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t('all')}</SelectItem>
              {filterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilters;
