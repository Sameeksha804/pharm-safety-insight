
import React from 'react';
import { Atom } from 'lucide-react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-4">
      <div className="relative">
        <Atom className="w-12 h-12 text-biotech-primary animate-spin" />
        <div className="absolute inset-0 w-12 h-12 border-2 border-biotech-secondary/30 rounded-full animate-pulse"></div>
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-foreground">Analyzing Drug Interaction</p>
        <p className="text-sm text-muted-foreground">Processing molecular mechanisms...</p>
      </div>
      <div className="flex space-x-1">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-2 h-2 bg-biotech-primary rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  );
};
