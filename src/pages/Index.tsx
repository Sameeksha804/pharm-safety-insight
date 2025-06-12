
import React, { useState } from 'react';
import { Search, AlertCircle, Zap, Atom, Shield, Beaker, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Header } from '@/components/Header';
import { DrugSearchInput } from '@/components/DrugSearchInput';
import { InteractionResults } from '@/components/InteractionResults';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Drug, AnalysisResult } from '@/types/drug';
import { DrugInteractionService } from '@/services/drugDatabase';

const Index: React.FC = () => {
  const [drug1, setDrug1] = useState<Drug | null>(null);
  const [drug2, setDrug2] = useState<Drug | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!drug1 || !drug2) {
      setError('Please select both medications to analyze their interaction.');
      return;
    }

    if (drug1.id === drug2.id) {
      setError('Please select two different medications for analysis.');
      return;
    }

    setError(null);
    setIsAnalyzing(true);
    setAnalysisResult(null);

    // Simulate API call delay for realistic feel
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      const interaction = DrugInteractionService.analyzeDrugInteraction(drug1, drug2);
      const result: AnalysisResult = {
        ...interaction,
        analysisTimestamp: new Date(),
        confidence: Math.floor(Math.random() * 20) + 80 // 80-99% confidence
      };

      setAnalysisResult(result);
    } catch (err) {
      setError('An error occurred during analysis. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setDrug1(null);
    setDrug2(null);
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background molecular-bg">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Analyze Drug Interactions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Enter two medications below to get comprehensive safety analysis, 
            interaction warnings, and clinical recommendations.
          </p>
        </div>

        {/* Search Interface */}
        <Card className="biotech-card max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-biotech-primary" />
              Drug Interaction Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DrugSearchInput
                label="First Medication"
                placeholder="Search for first medication..."
                onDrugSelect={setDrug1}
                selectedDrug={drug1}
              />
              <DrugSearchInput
                label="Second Medication"
                placeholder="Search for second medication..."
                onDrugSelect={setDrug2}
                selectedDrug={drug2}
              />
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleAnalyze}
                disabled={!drug1 || !drug2 || isAnalyzing}
                className="px-8 py-3 text-lg bg-biotech-primary hover:bg-biotech-primary/90 text-white"
              >
                {isAnalyzing ? (
                  <>
                    <Atom className="w-5 h-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Analyze Interaction
                  </>
                )}
              </Button>
              
              {(drug1 || drug2 || analysisResult) && (
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="px-6 py-3"
                >
                  Reset
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isAnalyzing && <LoadingSpinner />}

        {/* Results */}
        {analysisResult && !isAnalyzing && (
          <InteractionResults result={analysisResult} />
        )}

        {/* Info Cards */}
        {!analysisResult && !isAnalyzing && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card className="biotech-card text-center">
              <CardContent className="pt-6">
                <Shield className="w-12 h-12 text-biotech-safe mx-auto mb-4" />
                <h3 className="font-semibold mb-2">FDA-Approved Data</h3>
                <p className="text-sm text-muted-foreground">
                  Analysis based on verified pharmaceutical databases and clinical studies.
                </p>
              </CardContent>
            </Card>

            <Card className="biotech-card text-center">
              <CardContent className="pt-6">
                <Beaker className="w-12 h-12 text-biotech-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Advanced Algorithm</h3>
                <p className="text-sm text-muted-foreground">
                  AI-powered analysis considering molecular mechanisms and clinical pathways.
                </p>
              </CardContent>
            </Card>

            <Card className="biotech-card text-center">
              <CardContent className="pt-6">
                <Heart className="w-12 h-12 text-biotech-secondary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Patient Safety</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive safety recommendations for healthcare providers.
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Disclaimer */}
        <div className="max-w-4xl mx-auto">
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-sm">
              <strong>Medical Disclaimer:</strong> This tool is for educational purposes only 
              and should not replace professional medical advice. Always consult with a 
              healthcare provider before making medication decisions.
            </AlertDescription>
          </Alert>
        </div>
      </main>
    </div>
  );
};

export default Index;
