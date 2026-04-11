import type { GeneratedPathway, CombinedDataset } from '../types';

/**
 * Identifies unique modules and skills between two pathways.
 */
export function getPathwayDiff(pathwayA: GeneratedPathway, pathwayB: GeneratedPathway, _dataset: CombinedDataset) {
  const m1 = new Set(pathwayA.modules);
  const m2 = new Set(pathwayB.modules);

  const onlyInP1 = pathwayA.modules.filter(id => !m2.has(id));
  const onlyInP2 = pathwayB.modules.filter(id => !m1.has(id));

  const s1 = new Set(pathwayA.acquiredSkills);
  const s2 = new Set(pathwayB.acquiredSkills);

  const skillsOnlyInP1 = pathwayA.acquiredSkills.filter(id => !s2.has(id));
  const skillsOnlyInP2 = pathwayB.acquiredSkills.filter(id => !s1.has(id));

  return {
    modules: { onlyInP1, onlyInP2 },
    skills: { onlyInP1: skillsOnlyInP1, onlyInP2: skillsOnlyInP2 }
  };
}

/**
 * Validates that modules in a pathway are following a logical sequence based on prerequisites.
 */
export function validatePathwaySequence(pathway: GeneratedPathway, dataset: CombinedDataset): {message: string, moduleId?: string}[] {
  const issues: {message: string, moduleId?: string}[] = [];
  const acquiredSoFar = new Set<string>();

  pathway.modules.forEach((modId, index) => {
    const mod = dataset.modules.find(m => m.id === modId);
    if (!mod) return;

    // Check prerequisites
    const missingPrereqs = mod.prerequisites.filter(pId => !acquiredSoFar.has(pId));
    
    // Note: In some systems, prerequisites can be other modules OR specific skills.
    // We check if the prerequisite ID has been seen yet (as a module ID or as a skill already acquired).
    if (missingPrereqs.length > 0) {
      // Look up skill names for better error messages if possible
      const names = missingPrereqs.map(pId => {
        const pMod = dataset.modules.find(m => m.id === pId);
        const pSkill = dataset.skills.find(s => s.id === pId);
        return pMod?.title || pSkill?.name || pId;
      });

      issues.push({
        message: `Sequence alert: ${mod.title} (Step ${index + 1}) requires ${names.join(', ')} which appear later or are missing.`,
        moduleId: modId
      });
    }

    // Add this module's outcomes to the acquired set
    mod.outcomes.forEach(sId => acquiredSoFar.add(sId));
    acquiredSoFar.add(modId);
  });

  return issues;
}

/**
 * Generates reasons why a module is included in a pathway for a specific goal.
 */
export function calculateRationale(moduleId: string, goal: any, dataset: CombinedDataset): string[] {
  const module = dataset.modules.find(m => m.id === moduleId);
  if (!module) return [];

  const goalSkills = new Set(goal.targetSkills);
  const matchedSkillsIds = module.outcomes.filter(sId => goalSkills.has(sId));

  const rationale: string[] = [];
  
  if (matchedSkillsIds.length > 0) {
    const skillNames = matchedSkillsIds.map(id => dataset.skills.find(s => s.id === id)?.name || id);
    rationale.push(`Direct alignment: Provides ${skillNames.join(', ')} required for ${goal.title}.`);
  }

  if (module.credits && module.credits > 0) {
    rationale.push(`Contribution: Significant weighting (${module.credits} credits) towards qualification total.`);
  }

  return rationale;
}
