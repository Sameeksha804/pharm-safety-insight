
import { Drug, DrugInteraction, SideEffect, BodySystem } from '@/types/drug';

// Mock comprehensive drug database
export const mockDrugs: Drug[] = [
  {
    id: '1',
    name: 'Aspirin',
    genericName: 'Acetylsalicylic acid',
    category: 'NSAID',
    mechanism: 'COX enzyme inhibitor',
    commonSideEffects: ['Stomach irritation', 'Bleeding risk', 'Tinnitus'],
    bodySystemsAffected: ['Cardiovascular', 'Gastrointestinal', 'Blood']
  },
  {
    id: '2',
    name: 'Warfarin',
    genericName: 'Warfarin sodium',
    category: 'Anticoagulant',
    mechanism: 'Vitamin K antagonist',
    commonSideEffects: ['Bleeding', 'Bruising', 'Hair loss'],
    bodySystemsAffected: ['Blood', 'Cardiovascular']
  },
  {
    id: '3',
    name: 'Metoprolol',
    genericName: 'Metoprolol tartrate',
    category: 'Beta-blocker',
    mechanism: 'Beta-1 receptor antagonist',
    commonSideEffects: ['Fatigue', 'Dizziness', 'Cold hands'],
    bodySystemsAffected: ['Cardiovascular', 'Respiratory']
  },
  {
    id: '4',
    name: 'Lisinopril',
    genericName: 'Lisinopril',
    category: 'ACE Inhibitor',
    mechanism: 'Angiotensin-converting enzyme inhibitor',
    commonSideEffects: ['Dry cough', 'Dizziness', 'Hyperkalemia'],
    bodySystemsAffected: ['Cardiovascular', 'Renal']
  },
  {
    id: '5',
    name: 'Metformin',
    genericName: 'Metformin hydrochloride',
    category: 'Antidiabetic',
    mechanism: 'Glucose production inhibitor',
    commonSideEffects: ['Nausea', 'Diarrhea', 'Metallic taste'],
    bodySystemsAffected: ['Gastrointestinal', 'Endocrine']
  },
  {
    id: '6',
    name: 'Simvastatin',
    genericName: 'Simvastatin',
    category: 'Statin',
    mechanism: 'HMG-CoA reductase inhibitor',
    commonSideEffects: ['Muscle pain', 'Liver enzyme elevation', 'Headache'],
    bodySystemsAffected: ['Musculoskeletal', 'Hepatic']
  },
  {
    id: '7',
    name: 'Omeprazole',
    genericName: 'Omeprazole',
    category: 'Proton pump inhibitor',
    mechanism: 'H+/K+ ATPase inhibitor',
    commonSideEffects: ['Headache', 'Nausea', 'Diarrhea'],
    bodySystemsAffected: ['Gastrointestinal']
  },
  {
    id: '8',
    name: 'Sertraline',
    genericName: 'Sertraline hydrochloride',
    category: 'SSRI',
    mechanism: 'Serotonin reuptake inhibitor',
    commonSideEffects: ['Nausea', 'Insomnia', 'Sexual dysfunction'],
    bodySystemsAffected: ['Central Nervous System', 'Gastrointestinal']
  }
];

// Mock interaction analysis service
export class DrugInteractionService {
  static searchDrugs(query: string): Drug[] {
    if (!query.trim()) return mockDrugs.slice(0, 5);
    
    return mockDrugs.filter(drug => 
      drug.name.toLowerCase().includes(query.toLowerCase()) ||
      drug.genericName.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 8);
  }

  static analyzeDrugInteraction(drug1: Drug, drug2: Drug): DrugInteraction {
    console.log(`Analyzing interaction between ${drug1.name} and ${drug2.name}`);
    
    // Complex interaction logic simulation
    const interactionMatrix = this.getInteractionMatrix();
    const interaction = interactionMatrix[drug1.category]?.[drug2.category] || 
                       interactionMatrix[drug2.category]?.[drug1.category] ||
                       this.getDefaultInteraction();

    const sideEffects: SideEffect[] = this.generateSideEffects(drug1, drug2, interaction.severity);
    const affectedSystems: BodySystem[] = this.generateAffectedSystems(drug1, drug2);

    return {
      drug1,
      drug2,
      safetyLevel: interaction.safetyLevel,
      safetyScore: interaction.safetyScore,
      interactionType: interaction.type,
      mechanism: interaction.mechanism,
      description: interaction.description,
      sideEffects,
      affectedSystems,
      recommendations: interaction.recommendations,
      severity: interaction.severity
    };
  }

  private static getInteractionMatrix() {
    return {
      'NSAID': {
        'Anticoagulant': {
          safetyLevel: 'danger' as const,
          safetyScore: 25,
          type: 'Pharmacodynamic',
          mechanism: 'Increased bleeding risk due to antiplatelet effects of NSAIDs combined with anticoagulation',
          description: 'DANGEROUS: Combined use significantly increases bleeding risk. Both medications affect blood clotting through different mechanisms.',
          recommendations: [
            'Avoid concurrent use if possible',
            'If necessary, use lowest effective doses',
            'Monitor closely for bleeding signs',
            'Consider alternative pain management'
          ],
          severity: 'severe' as const
        },
        'Beta-blocker': {
          safetyLevel: 'caution' as const,
          safetyScore: 65,
          type: 'Pharmacodynamic',
          mechanism: 'NSAIDs may reduce antihypertensive effects of beta-blockers',
          description: 'CAUTION: NSAIDs may decrease the blood pressure lowering effects of beta-blockers.',
          recommendations: [
            'Monitor blood pressure regularly',
            'Use lowest effective NSAID dose',
            'Consider alternative pain relief methods'
          ],
          severity: 'moderate' as const
        }
      },
      'Statin': {
        'SSRI': {
          safetyLevel: 'safe' as const,
          safetyScore: 85,
          type: 'Minimal interaction',
          mechanism: 'No significant pharmacokinetic or pharmacodynamic interaction',
          description: 'SAFE: These medications can generally be taken together safely.',
          recommendations: [
            'Continue regular monitoring for each medication',
            'Report any unusual symptoms to healthcare provider'
          ],
          severity: 'mild' as const
        }
      },
      'ACE Inhibitor': {
        'Antidiabetic': {
          safetyLevel: 'safe' as const,
          safetyScore: 90,
          type: 'Beneficial interaction',
          mechanism: 'ACE inhibitors may enhance insulin sensitivity',
          description: 'SAFE: These medications work well together and may provide cardiovascular benefits.',
          recommendations: [
            'Continue regular monitoring',
            'May improve overall cardiovascular outcomes'
          ],
          severity: 'mild' as const
        }
      }
    };
  }

  private static getDefaultInteraction() {
    return {
      safetyLevel: 'caution' as const,
      safetyScore: 70,
      type: 'Unknown interaction',
      mechanism: 'Interaction profile not fully characterized',
      description: 'CAUTION: Limited data available on this drug combination. Exercise caution and monitor closely.',
      recommendations: [
        'Consult healthcare provider',
        'Monitor for unusual symptoms',
        'Start with lowest effective doses'
      ],
      severity: 'moderate' as const
    };
  }

  private static generateSideEffects(drug1: Drug, drug2: Drug, severity: string): SideEffect[] {
    const combinedEffects = [...drug1.commonSideEffects, ...drug2.commonSideEffects];
    const uniqueEffects = Array.from(new Set(combinedEffects));

    return uniqueEffects.map(effect => ({
      name: effect,
      severity: severity === 'severe' ? 'severe' : 
               severity === 'moderate' ? 'moderate' : 'mild',
      frequency: Math.random() > 0.7 ? 'common' : 
                Math.random() > 0.5 ? 'uncommon' : 'rare',
      description: `${effect} may be enhanced when ${drug1.name} and ${drug2.name} are used together.`
    }));
  }

  private static generateAffectedSystems(drug1: Drug, drug2: Drug): BodySystem[] {
    const allSystems = [
      'Cardiovascular', 'Central Nervous System', 'Gastrointestinal', 
      'Respiratory', 'Renal', 'Hepatic', 'Endocrine', 'Musculoskeletal', 'Blood'
    ];

    const affectedSystemNames = [
      ...drug1.bodySystemsAffected, 
      ...drug2.bodySystemsAffected
    ];

    return allSystems.map(system => ({
      name: system,
      affected: affectedSystemNames.includes(system),
      description: affectedSystemNames.includes(system) 
        ? `This system may be affected by the interaction between ${drug1.name} and ${drug2.name}.`
        : `This system is not expected to be significantly affected.`,
      riskLevel: affectedSystemNames.includes(system) 
        ? (Math.random() > 0.6 ? 'high' : 'medium') 
        : 'low'
    }));
  }
}
