import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Brain, Activity, Lungs, Eye, Coffee } from 'lucide-react';

export const BodySystemVisualization: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  const bodySystems = [
    {
      id: 'cardiovascular',
      name: 'Cardiovascular',
      icon: Heart,
      position: { top: '30%', left: '45%' },
      risk: 'low',
      description: 'Heart and blood vessels - monitors heart rate and blood pressure changes'
    },
    {
      id: 'nervous',
      name: 'Central Nervous',
      icon: Brain,
      position: { top: '10%', left: '45%' },
      risk: 'high',
      description: 'Brain and spinal cord - affects cognitive function and motor control'
    },
    {
      id: 'respiratory',
      name: 'Respiratory',
      icon: Lungs,
      position: { top: '25%', left: '35%' },
      risk: 'medium',
      description: 'Lungs and airways - monitors breathing patterns and oxygen levels'
    },
    {
      id: 'renal',
      name: 'Renal',
      icon: Activity,
      position: { top: '45%', left: '35%' },
      risk: 'low',
      description: 'Kidneys and urinary system - monitors waste elimination and fluid balance'
    },
    {
      id: 'hepatic',
      name: 'Hepatic',
      icon: Coffee,
      position: { top: '35%', left: '55%' },
      risk: 'medium',
      description: 'Liver and metabolism - monitors drug processing and detoxification'
    },
    {
      id: 'ocular',
      name: 'Ocular',
      icon: Eye,
      position: { top: '8%', left: '35%' },
      risk: 'low',
      description: 'Eyes and vision - monitors visual changes and eye pressure'
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-biotech-danger';
      case 'medium': return 'text-biotech-warning';
      case 'low': return 'text-biotech-safe';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBg = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-biotech-danger/20 border-biotech-danger/50';
      case 'medium': return 'bg-biotech-warning/20 border-biotech-warning/50';
      case 'low': return 'bg-biotech-safe/20 border-biotech-safe/50';
      default: return 'bg-muted/20 border-muted/50';
    }
  };

  return (
    <Card className="biotech-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-biotech-primary" />
          Body System Impact Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Interactive Body Diagram */}
          <div className="relative">
            <div className="relative w-full h-96 bg-gradient-to-b from-biotech-primary/5 to-biotech-secondary/5 rounded-lg border-2 border-dashed border-border/50">
              {/* Human Silhouette */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl text-muted-foreground/20">🧍</div>
              </div>
              
              {/* Interactive System Points */}
              {bodySystems.map((system) => (
                <div
                  key={system.id}
                  className={`absolute cursor-pointer transition-all duration-300 ${
                    selectedSystem === system.id ? 'scale-125 z-10' : 'hover:scale-110'
                  }`}
                  style={system.position}
                  onClick={() => setSelectedSystem(selectedSystem === system.id ? null : system.id)}
                >
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${getRiskBg(system.risk)} ${getRiskColor(system.risk)}`}>
                    <system.icon className="w-4 h-4" />
                  </div>
                  
                  {selectedSystem === system.id && (
                    <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-background border border-border rounded-lg p-3 shadow-lg min-w-48 z-20">
                      <h4 className="font-semibold text-sm mb-1">{system.name}</h4>
                      <p className="text-xs text-muted-foreground">{system.description}</p>
                      <Badge 
                        variant="outline" 
                        className={`mt-2 text-xs ${getRiskColor(system.risk)}`}
                      >
                        {system.risk.toUpperCase()} RISK
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* System Details */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg mb-4">System Analysis</h3>
            {bodySystems.map((system) => (
              <div
                key={system.id}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  selectedSystem === system.id 
                    ? getRiskBg(system.risk) + ' scale-[1.02]'
                    : 'border-border/50 bg-muted/5 hover:bg-muted/10'
                }`}
                onClick={() => setSelectedSystem(selectedSystem === system.id ? null : system.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <system.icon className={`w-5 h-5 ${getRiskColor(system.risk)}`} />
                    <span className="font-medium">{system.name}</span>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getRiskColor(system.risk)}`}
                  >
                    {system.risk}
                  </Badge>
                </div>
                {selectedSystem === system.id && (
                  <p className="text-sm text-muted-foreground mt-2 animate-fade-in">
                    {system.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
