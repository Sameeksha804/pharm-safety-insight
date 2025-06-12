import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Activity, Heart, Brain, Coffee } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AnalysisResult } from '@/types/drug';

interface InteractionResultsProps {
  result: AnalysisResult;
}

export const InteractionResults: React.FC<InteractionResultsProps> = ({ result }) => {
  const getSafetyIcon = () => {
    switch (result.safetyLevel) {
      case 'safe':
        return <CheckCircle className="w-6 h-6 text-biotech-safe" />;
      case 'caution':
        return <AlertTriangle className="w-6 h-6 text-biotech-warning" />;
      case 'danger':
        return <XCircle className="w-6 h-6 text-biotech-danger" />;
    }
  };

  const getSafetyClass = () => {
    switch (result.safetyLevel) {
      case 'safe':
        return 'safety-safe';
      case 'caution':
        return 'safety-caution';
      case 'danger':
        return 'safety-danger';
    }
  };

  const getSafetyColor = () => {
    switch (result.safetyLevel) {
      case 'safe':
        return 'hsl(var(--biotech-safe))';
      case 'caution':
        return 'hsl(var(--biotech-warning))';
      case 'danger':
        return 'hsl(var(--biotech-danger))';
    }
  };

  const getBodySystemIcon = (systemName: string) => {
    switch (systemName.toLowerCase()) {
      case 'cardiovascular':
        return <Heart className="w-5 h-5" />;
      case 'central nervous system':
        return <Brain className="w-5 h-5" />;
      case 'gastrointestinal':
        return <Coffee className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Safety Overview */}
      <Card className={`biotech-card ${getSafetyClass()}`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            {getSafetyIcon()}
            <span className="text-xl font-bold">
              Safety Analysis: {result.safetyLevel.toUpperCase()}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Safety Score</span>
                <span className="text-lg font-bold">{result.safetyScore}/100</span>
              </div>
              <Progress 
                value={result.safetyScore} 
                className="h-3"
                style={{
                  background: `linear-gradient(to right, ${getSafetyColor()} 0%, ${getSafetyColor()} ${result.safetyScore}%, hsl(var(--muted)) ${result.safetyScore}%)`
                }}
              />
            </div>
            
            <div className="space-y-2">
              <p className="text-sm font-medium">Interaction Type:</p>
              <Badge variant="outline" className="text-sm">
                {result.interactionType}
              </Badge>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Description:</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {result.description}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Mechanism:</p>
              <p className="text-sm text-muted-foreground leading-relaxed bg-muted/30 p-3 rounded-lg">
                {result.mechanism}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Affected Body Systems */}
      <Card className="biotech-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-biotech-primary" />
            Affected Body Systems
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {result.affectedSystems.map((system) => (
              <div
                key={system.name}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  system.affected 
                    ? `border-biotech-${system.riskLevel === 'high' ? 'danger' : system.riskLevel === 'medium' ? 'warning' : 'safe'}/50 bg-biotech-${system.riskLevel === 'high' ? 'danger' : system.riskLevel === 'medium' ? 'warning' : 'safe'}/5`
                    : 'border-muted/50 bg-muted/5'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  {getBodySystemIcon(system.name)}
                  <span className="font-medium text-sm">{system.name}</span>
                  {system.affected && (
                    <Badge 
                      variant={system.riskLevel === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {system.riskLevel}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {system.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Side Effects */}
      <Card className="biotech-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-biotech-warning" />
            Potential Side Effects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.sideEffects.map((effect, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-sm">{effect.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {effect.description}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Badge
                    variant={effect.severity === 'severe' ? 'destructive' : 
                            effect.severity === 'moderate' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {effect.severity}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {effect.frequency}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="biotech-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-biotech-secondary" />
            Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {result.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="w-2 h-2 bg-biotech-secondary rounded-full mt-2 flex-shrink-0"></span>
                <span className="text-sm text-muted-foreground">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Analysis Info */}
      <Card className="biotech-card">
        <CardContent className="pt-6">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Analysis performed: {result.analysisTimestamp.toLocaleString()}</span>
            <span>Confidence: {result.confidence}%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
