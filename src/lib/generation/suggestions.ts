import type { CombinedDataset, GeneratedPathway } from '../../types';

export interface PathwaySuggestion {
  id: string;
  type: 'overlooked' | 'elective' | 'variation';
  title: string;
  description: string;
  moduleId?: string;
  rationale: string;
}

/**
 * Deterministic suggestion engine for providing optional pathway enhancements.
 * This logic identifies modules that were missed by the current strategy but align
 * with the general category or goal.
 */

export const getPathwaySuggestions = (
  pathway: GeneratedPathway,
  dataset: CombinedDataset
): PathwaySuggestion[] => {
  const suggestions: PathwaySuggestion[] = [];
  const pathwayModuleIds = new Set(pathway.modules);

  // 1. Identify "Overlooked Modules"
  // Find modules that provide skills in the same category as the pathway modules but are missing.
  const pathwayCategories = new Set<string>();
  pathway.acquiredSkills.forEach(sId => {
    const skill = dataset.skills.find(s => s.id === sId);
    if (skill?.category) pathwayCategories.add(skill.category);
  });

  const overlooked = dataset.modules.filter(m => 
    !pathwayModuleIds.has(m.id) && 
    m.outcomes.some(sId => {
      const s = dataset.skills.find(sk => sk.id === sId);
      return s && pathwayCategories.has(s.category || '');
    })
  ).slice(0, 2);

  overlooked.forEach(m => {
    suggestions.push({
      id: `sug-overlooked-${m.id}`,
      type: 'overlooked',
      title: `Enhance depth: ${m.title}`,
      description: m.description,
      moduleId: m.id,
      rationale: "Provides more analytical and clinical depth in the same primary category as your chosen path."
    });
  });

  // 2. Identify "Alternative Electives"
  // Find modules with no prerequisites or prerequisites already met, that relate to the goal's intent.
  const electives = dataset.modules.filter(m => 
    !pathwayModuleIds.has(m.id) &&
    m.prerequisites.every(pId => pathwayModuleIds.has(pId)) &&
    !overlooked.some(o => o.id === m.id)
  ).slice(0, 2);

  electives.forEach(m => {
    suggestions.push({
      id: `sug-elective-${m.id}`,
      type: 'elective',
      title: `Consider elective: ${m.title}`,
      description: m.description,
      moduleId: m.id,
      rationale: "You have already met the prerequisites for this module. It could be a highly relevant curriculum addition."
    });
  });

  // 3. Constant "Breadth Variation" Suggestion
  if (!pathway.title.includes("Comprehensive")) {
    suggestions.push({
      id: 'sug-variation-comp',
      type: 'variation',
      title: "Explore Comprehensive Strategy",
      description: "Switch to the 'Comprehensive' version of this pathway for maximal capability alignment.",
      rationale: "Broadens the systemic scope of your learning beyond the most direct route."
    });
  }

  return suggestions;
};
