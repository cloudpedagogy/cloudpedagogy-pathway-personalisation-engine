export interface Skill {
  id: string;
  name: string;
  description?: string;
  category?: string;
}

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  targetSkills: string[]; // Skill IDs
}

export interface Module {
  id: string;
  title: string;
  description: string;
  credits?: number;
  duration?: string; // e.g., '10 hours', '2 weeks'
  prerequisites: string[]; // Module IDs or Skill IDs
  outcomes: string[]; // Skill IDs
}

export interface PathwayTemplate {
  id: string;
  title: string;
  description: string;
  targetRoles?: string[];
  recommendedModules: string[]; // Module IDs
}

export interface GeneratedPathway {
  id: string;
  userId?: string;
  learningGoalId: string;
  title: string;
  rationale: string;
  modules: string[]; // Module IDs in order
  estimatedCompletionTime?: string;
  acquiredSkills: string[]; // Skill IDs
  skillCoverageCount: number;
  score?: number; // Internal score for sorting
}

export type DecisionStatus = 'pending' | 'accepted' | 'revision' | 'unsuitable';

export interface PathwayDecision {
  pathwayId: string;
  status: DecisionStatus;
  notes: string;
  reviewDate: string;
  checklist: Record<string, boolean>;
}

export interface CombinedDataset {
  skills: Skill[];
  learningGoals: LearningGoal[];
  modules: Module[];
  pathwayTemplates: PathwayTemplate[];
  capabilityNotes?: string;
  governanceNotes?: string;
}
