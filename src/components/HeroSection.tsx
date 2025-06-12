
import React from 'react';
import { Shield, Zap, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-biotech-primary/5 via-background to-biotech-secondary/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 dna-helix opacity-20"></div>
      
      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="bg-biotech-primary/10 text-biotech-primary px-4 py-2 rounded-full text-sm font-medium">
                  🧬 Advanced AI-Powered Analysis
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-foreground leading-tight">
                Making Expert
                <span className="text-biotech-primary block">Healthcare</span>
                for All
              </h1>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Analyze drug interactions with cutting-edge AI technology. 
                Get instant safety assessments, detailed interaction reports, 
                and personalized recommendations from our FDA-approved database.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-biotech-primary hover:bg-biotech-primary/90 text-white px-8 py-4 text-lg"
              >
                <Zap className="w-5 h-5 mr-2" />
                Start Analysis
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-biotech-primary text-biotech-primary hover:bg-biotech-primary/10 px-8 py-4 text-lg"
              >
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-6 border-t border-border/50">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-biotech-safe" />
                <span className="text-sm font-medium">FDA Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-biotech-secondary" />
                <span className="text-sm font-medium">294K+ Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-biotech-accent" />
                <span className="text-sm font-medium">99.2% Accuracy</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-biotech-primary/10 to-biotech-secondary/10 rounded-3xl p-8 backdrop-blur-sm">
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-biotech-primary rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-biotech-secondary rounded-full animate-pulse delay-300"></div>
              <div className="absolute top-1/2 -right-2 w-4 h-4 bg-biotech-accent rounded-full animate-pulse delay-700"></div>
              
              {/* Medical Interface Mockup */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-biotech-primary/20 rounded-full flex items-center justify-center">
                    <Shield className="w-6 h-6 text-biotech-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Safety Analysis</h3>
                    <p className="text-sm text-muted-foreground">Real-time interaction check</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-biotech-safe/10 rounded-lg">
                    <span className="text-sm font-medium">Drug Compatibility</span>
                    <span className="text-biotech-safe font-bold">SAFE</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-biotech-warning/10 rounded-lg">
                    <span className="text-sm font-medium">Side Effects</span>
                    <span className="text-biotech-warning font-bold">MONITOR</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-biotech-primary/10 rounded-lg">
                    <span className="text-sm font-medium">Recommendation</span>
                    <span className="text-biotech-primary font-bold">APPROVED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
