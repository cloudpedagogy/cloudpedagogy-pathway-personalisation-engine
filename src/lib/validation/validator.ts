import type { CombinedDataset } from '../../types';

export interface ValidationIssue {
  id?: string;
  type: 'module' | 'skill' | 'goal' | 'template' | 'general';
  level: 'warning' | 'error';
  message: string;
  field?: string;
}

export const validateDataset = (dataset: CombinedDataset): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];

  // 1. Duplicate IDs Check
  const allIds = [
    ...dataset.modules.map(m => m.id),
    ...dataset.skills.map(s => s.id),
    ...dataset.learningGoals.map(g => g.id),
    ...dataset.pathwayTemplates.map(t => t.id)
  ];
  const duplicates = allIds.filter((item, index) => allIds.indexOf(item) !== index);
  if (duplicates.length > 0) {
    issues.push({
      type: 'general',
      level: 'error',
      message: `Duplicate IDs found: ${Array.from(new Set(duplicates)).join(', ')}`
    });
  }

  // 2. Module Validation
  dataset.modules.forEach(m => {
    // Prerequisite links
    m.prerequisites.forEach(pId => {
      const exists = dataset.modules.some(mod => mod.id === pId) || dataset.skills.some(s => s.id === pId);
      if (!exists) {
        issues.push({ id: m.id, type: 'module', level: 'warning', message: `Broken prerequisite link: ${pId}`, field: 'prerequisites' });
      }
    });

    // Outcomes links
    m.outcomes.forEach(sId => {
      if (!dataset.skills.some(s => s.id === sId)) {
        issues.push({ id: m.id, type: 'module', level: 'warning', message: `Missing skill outcome: ${sId}`, field: 'outcomes' });
      }
    });
  });

  // 3. Goal Validation
  dataset.learningGoals.forEach(g => {
    g.targetSkills.forEach(sId => {
      if (!dataset.skills.some(s => s.id === sId)) {
        issues.push({ id: g.id, type: 'goal', level: 'warning', message: `Missing target skill: ${sId}`, field: 'targetSkills' });
      }
    });
  });

  // 4. Template Validation
  dataset.pathwayTemplates.forEach(t => {
    t.recommendedModules.forEach(mId => {
      if (!dataset.modules.some(m => m.id === mId)) {
        issues.push({ id: t.id, type: 'template', level: 'warning', message: `Missing recommended module: ${mId}`, field: 'recommendedModules' });
      }
    });
  });

  return issues;
};
