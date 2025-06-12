
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const DataTable: React.FC = () => {
  const interactionData = [
    {
      drug1: 'Aspirin',
      drug2: 'Warfarin',
      severity: 'High',
      mechanism: 'Anticoagulant synergy',
      frequency: '15%',
      trend: 'up'
    },
    {
      drug1: 'Metformin',
      drug2: 'Ibuprofen',
      severity: 'Medium',
      mechanism: 'Renal clearance',
      frequency: '8%',
      trend: 'down'
    },
    {
      drug1: 'Lisinopril',
      drug2: 'Potassium',
      severity: 'Medium',
      mechanism: 'Hyperkalemia risk',
      frequency: '12%',
      trend: 'stable'
    },
    {
      drug1: 'Simvastatin',
      drug2: 'Grapefruit',
      severity: 'High',
      mechanism: 'CYP3A4 inhibition',
      frequency: '25%',
      trend: 'up'
    },
    {
      drug1: 'Digoxin',
      drug2: 'Furosemide',
      severity: 'Medium',
      mechanism: 'Electrolyte imbalance',
      frequency: '10%',
      trend: 'stable'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'bg-biotech-danger/10 text-biotech-danger border-biotech-danger/20';
      case 'medium': return 'bg-biotech-warning/10 text-biotech-warning border-biotech-warning/20';
      case 'low': return 'bg-biotech-safe/10 text-biotech-safe border-biotech-safe/20';
      default: return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-biotech-danger" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-biotech-safe" />;
      case 'stable': return <Minus className="w-4 h-4 text-biotech-warning" />;
      default: return null;
    }
  };

  return (
    <Card className="biotech-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-biotech-primary" />
          Common Drug Interactions Database
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="font-semibold">Drug Combination</TableHead>
                <TableHead className="font-semibold">Severity</TableHead>
                <TableHead className="font-semibold">Mechanism</TableHead>
                <TableHead className="font-semibold">Frequency</TableHead>
                <TableHead className="font-semibold">Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interactionData.map((interaction, index) => (
                <TableRow key={index} className="border-border/50 hover:bg-muted/20 transition-colors">
                  <TableCell>
                    <div className="font-medium">
                      {interaction.drug1} + {interaction.drug2}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={`font-medium ${getSeverityColor(interaction.severity)}`}
                    >
                      {interaction.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {interaction.mechanism}
                  </TableCell>
                  <TableCell className="font-medium">
                    {interaction.frequency}
                  </TableCell>
                  <TableCell>
                    {getTrendIcon(interaction.trend)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
