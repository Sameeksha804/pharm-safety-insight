
export interface Drug {
  id: string;
  name: string;
  genericName: string;
  category: string;
  mechanism: string;
  commonSideEffects: string[];
  bodySystemsAffected: string[];
}

export interface DrugInteraction {
  drug1: Drug;
  drug2: Drug;
  safetyLevel: 'safe' | 'caution' | 'danger';
  safetyScore: number; // 0-100
  interactionType: string;
  mechanism: string;
  description: string;
  sideEffects: SideEffect[];
  affectedSystems: BodySystem[];
  recommendations: string[];
  severity: 'mild' | 'moderate' | 'severe';
}

export interface SideEffect {
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  frequency: 'rare' | 'uncommon' | 'common' | 'very common';
  description: string;
}

export interface BodySystem {
  name: string;
  affected: boolean;
  description: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface AnalysisResult extends DrugInteraction {
  analysisTimestamp: Date;
  confidence: number;
}
