
import React from 'react';
import { TrendingUp, Users, Shield, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const StatsCards: React.FC = () => {
  const stats = [
    {
      icon: Users,
      value: '294,550',
      label: 'Interactions Analyzed',
      trend: '+12%'
    },
    {
      icon: Shield,
      value: '99.2%',
      label: 'Accuracy Rate',
      trend: '+0.3%'
    },
    {
      icon: Award,
      value: '24/7',
      label: 'Support Available',
      trend: 'Always'
    },
    {
      icon: TrendingUp,
      value: '850+',
      label: 'Drug Combinations',
      trend: '+45'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="biotech-card hover:scale-105 transition-transform duration-300">
          <CardContent className="p-4 text-center">
            <div className="flex justify-center mb-2">
              <stat.icon className="w-8 h-8 text-biotech-primary" />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground mb-1">
              {stat.label}
            </div>
            <div className="text-xs text-biotech-secondary font-medium">
              {stat.trend}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
