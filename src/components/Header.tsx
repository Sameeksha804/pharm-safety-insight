
import React from 'react';
import { Atom, Shield, Beaker } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="w-full bg-background/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Atom className="w-8 h-8 text-biotech-primary molecular-float" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-biotech-secondary rounded-full pulse-glow"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                BioPharma<span className="text-biotech-primary">Analyzer</span>
              </h1>
              <p className="text-sm text-muted-foreground">
                Advanced Drug Interaction Intelligence Platform
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2 text-biotech-secondary">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">FDA Dataset</span>
            </div>
            <div className="flex items-center gap-2 text-biotech-accent">
              <Beaker className="w-5 h-5" />
              <span className="text-sm font-medium">AI-Powered</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
