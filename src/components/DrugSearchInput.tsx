
import React, { useState, useEffect } from 'react';
import { Search, Pill } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Drug } from '@/types/drug';
import { DrugInteractionService } from '@/services/drugDatabase';

interface DrugSearchInputProps {
  label: string;
  placeholder: string;
  onDrugSelect: (drug: Drug | null) => void;
  selectedDrug: Drug | null;
}

export const DrugSearchInput: React.FC<DrugSearchInputProps> = ({
  label,
  placeholder,
  onDrugSelect,
  selectedDrug
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Drug[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length > 0) {
      const results = DrugInteractionService.searchDrugs(query);
      setSuggestions(results);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleDrugSelect = (drug: Drug) => {
    setQuery(drug.name);
    setShowSuggestions(false);
    onDrugSelect(drug);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (e.target.value === '') {
      onDrugSelect(null);
    }
  };

  return (
    <div className="relative w-full">
      <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
        <Pill className="w-4 h-4 text-biotech-primary" />
        {label}
      </label>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          className="pl-10 pr-4 py-3 text-lg biotech-card focus:ring-2 focus:ring-biotech-primary"
          onFocus={() => query.length > 0 && setShowSuggestions(true)}
        />
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute z-10 w-full mt-1 biotech-card border shadow-lg">
          <div className="max-h-60 overflow-y-auto">
            {suggestions.map((drug) => (
              <div
                key={drug.id}
                className="p-3 hover:bg-secondary/50 cursor-pointer border-b border-border/50 last:border-b-0 transition-colors"
                onClick={() => handleDrugSelect(drug)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-foreground">{drug.name}</p>
                    <p className="text-sm text-muted-foreground">{drug.genericName}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-biotech-primary/10 text-biotech-primary rounded-full">
                    {drug.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {selectedDrug && (
        <div className="mt-3 p-3 bg-biotech-secondary/10 rounded-lg border border-biotech-secondary/20">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-medium text-foreground">{selectedDrug.name}</p>
              <p className="text-sm text-muted-foreground">{selectedDrug.genericName}</p>
              <p className="text-xs text-biotech-secondary mt-1">{selectedDrug.mechanism}</p>
            </div>
            <span className="text-xs px-2 py-1 bg-biotech-primary text-white rounded-full">
              {selectedDrug.category}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
