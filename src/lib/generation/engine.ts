import type { CombinedDataset, GeneratedPathway, LearningGoal } from '../../types';

/**
 * Rule-based pathway generation engine for the Pathway Personalisation Engine.
 * This engine generates 2-3 pathway options based on a selected goal.
 */

export const generatePathways = (goal: LearningGoal, dataset: CombinedDataset): GeneratedPathway[] => {
  const pathways: GeneratedPathway[] = [];

  // Strategy 1: "Focused Path" (Just the essential modules + prerequisites)
  const focusedPath = createFocusedPathway(goal, dataset);
  pathways.push(focusedPath);

  // Strategy 2: "Template-Guided Path" (Uses existing templates as a baseline)
  const templatePath = createTemplateGuidedPathway(goal, dataset);
  if (templatePath) {
    pathways.push(templatePath);
  }

  // Strategy 3: "Comprehensive Path" (Include all modules that cover the skills + extras)
  const comprehensivePath = createComprehensivePathway(goal, dataset);
  pathways.push(comprehensivePath);

  return pathways;
};

/**
 * Creates a focused pathway using the minimum set of modules to cover the goal skills.
 */
function createFocusedPathway(goal: LearningGoal, dataset: CombinedDataset): GeneratedPathway {
  const targetSkillIds = goal.targetSkills;
  const selectedModuleIds: string[] = [];
  const coveredSkillIds = new Set<string>();

  // Find modules that cover the skills
  targetSkillIds.forEach(skillId => {
    if (!coveredSkillIds.has(skillId)) {
      const bestModule = dataset.modules.find(m => m.outcomes.includes(skillId));
      if (bestModule && !selectedModuleIds.includes(bestModule.id)) {
        selectedModuleIds.push(bestModule.id);
        bestModule.outcomes.forEach(s => coveredSkillIds.add(s));
      }
    }
  });

  const orderedModules = resolvePrerequisites(selectedModuleIds, dataset);

  return {
    id: `pw-focused-${goal.id}-${Date.now()}`,
    learningGoalId: goal.id,
    title: `Focused ${goal.title}`,
    rationale: "Prioritises the core modules required to achieve the primary pathway intent with maximal efficiency.",
    modules: orderedModules,
    acquiredSkills: Array.from(coveredSkillIds),
    skillCoverageCount: targetSkillIds.filter(s => coveredSkillIds.has(s)).length,
  };
}

/**
 * Creates a pathway by looking for the best-matching template.
 */
function createTemplateGuidedPathway(goal: LearningGoal, dataset: CombinedDataset): GeneratedPathway | null {
  // Find a template that matches the goal's target skills best
  const templates = dataset.pathwayTemplates;
  if (templates.length === 0) return null;

  // Simple heuristic: match skills
  const targetSkillIds = new Set(goal.targetSkills);
  
  let bestTemplate = templates[0];
  let maxMatch = -1;

  templates.forEach(t => {
    const templateSkills = new Set<string>();
    t.recommendedModules.forEach(mId => {
      const m = dataset.modules.find(mod => mod.id === mId);
      m?.outcomes.forEach(s => templateSkills.add(s));
    });

    const matchCount = Array.from(targetSkillIds).filter(s => templateSkills.has(s)).length;
    if (matchCount > maxMatch) {
      maxMatch = matchCount;
      bestTemplate = t;
    }
  });

  const coveredSkills = new Set<string>();
  bestTemplate.recommendedModules.forEach(mId => {
    const m = dataset.modules.find(mod => mod.id === mId);
    m?.outcomes.forEach(s => coveredSkills.add(s));
  });

  return {
    id: `pw-template-${bestTemplate.id}-${Date.now()}`,
    learningGoalId: goal.id,
    title: `${bestTemplate.title} (Guided)`,
    rationale: `Leverages the pre-vetted ${bestTemplate.title} curriculum framework which aligns closely with your intended outcomes.`,
    modules: bestTemplate.recommendedModules,
    acquiredSkills: Array.from(coveredSkills),
    skillCoverageCount: Array.from(targetSkillIds).filter(s => coveredSkills.has(s)).length,
  };
}

/**
 * Creates a comprehensive pathway including all relevant modules.
 */
function createComprehensivePathway(goal: LearningGoal, dataset: CombinedDataset): GeneratedPathway {
  const targetSkillIds = goal.targetSkills;
  const selectedModuleIds: string[] = [];
  const coveredSkillIds = new Set<string>();

  // Find ALL modules that cover the skills
  dataset.modules.forEach(m => {
    if (m.outcomes.some(s => targetSkillIds.includes(s))) {
      selectedModuleIds.push(m.id);
      m.outcomes.forEach(s => coveredSkillIds.add(s));
    }
  });

  const orderedModules = resolvePrerequisites(selectedModuleIds, dataset);

  return {
    id: `pw-comp-${goal.id}-${Date.now()}`,
    learningGoalId: goal.id,
    title: `Comprehensive ${goal.title}`,
    rationale: "A rigorous, broad-spectrum sequence including all related curriculum components for deep mastery.",
    modules: orderedModules,
    acquiredSkills: Array.from(coveredSkillIds),
    skillCoverageCount: targetSkillIds.filter(s => coveredSkillIds.has(s)).length,
  };
}

/**
 * Resolves prerequisites recursively and returns a topological ordering.
 * Simple dependency-first sort for this bootstrap.
 */
function resolvePrerequisites(initialModuleIds: string[], dataset: CombinedDataset): string[] {
  const result: string[] = [];
  const visited = new Set<string>();

  function visit(mId: string) {
    if (visited.has(mId)) return;
    
    const module = dataset.modules.find(m => m.id === mId);
    if (!module) return;

    // Visit prerequisites first
    module.prerequisites.forEach(pId => {
      // Check if pId is a module ID (simple assumption for now)
      if (dataset.modules.some(m => m.id === pId)) {
        visit(pId);
      }
    });

    visited.add(mId);
    result.push(mId);
  }

  initialModuleIds.forEach(id => visit(id));
  return result;
}
