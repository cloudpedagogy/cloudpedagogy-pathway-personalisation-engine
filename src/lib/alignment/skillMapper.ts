import type { CombinedDataset, GeneratedPathway, LearningGoal, Skill, Module } from '../../types';

export interface AlignmentAnalysis {
  coveredSkills: {
    skill: Skill;
    count: number; // How many modules in the pathway contribute to this skill
  }[];
  gaps: Skill[];
  concentration: {
    category: string;
    percentage: number;
  }[];
  summary: string;
  isOverConcentrated: boolean;
}

export const analyzeSkillAlignment = (
  pathway: GeneratedPathway,
  goal: LearningGoal,
  dataset: CombinedDataset
): AlignmentAnalysis => {
  const pathwayModules = pathway.modules
    .map(mId => dataset.modules.find(m => m.id === mId))
    .filter((m): m is Module => !!m);

  // 1. Calculate Covered Skills and their strength (counts)
  const skillCounts: Record<string, number> = {};
  pathwayModules.forEach(m => {
    m.outcomes.forEach(sId => {
      skillCounts[sId] = (skillCounts[sId] || 0) + 1;
    });
  });

  const coveredSkills = Object.entries(skillCounts)
    .map(([sId, count]) => ({
      skill: dataset.skills.find(s => s.id === sId)!,
      count
    }))
    .filter(item => !!item.skill);

  // 2. Identify Gaps relative to the initial goal
  const goalSkillIds = new Set(goal.targetSkills);
  const pathwaySkillIds = new Set(Object.keys(skillCounts));
  
  const gaps = Array.from(goalSkillIds)
    .filter(sId => !pathwaySkillIds.has(sId))
    .map(sId => dataset.skills.find(s => s.id === sId)!)
    .filter(s => !!s);

  // 3. Concentration (by category)
  const categoryCounts: Record<string, number> = {};
  let totalSkillContributions = 0;

  coveredSkills.forEach(({ skill, count }) => {
    const category = skill.category || 'Uncategorized';
    categoryCounts[category] = (categoryCounts[category] || 0) + count;
    totalSkillContributions += count;
  });

  const concentration = Object.entries(categoryCounts).map(([category, count]) => ({
    category,
    percentage: (count / totalSkillContributions) * 100
  })).sort((a, b) => b.percentage - a.percentage);

  const isOverConcentrated = concentration.some(c => c.percentage > 60);

  // 4. Summary Text
  const gapText = gaps.length > 0 
    ? `There are ${gaps.length} skill gaps relative to your goal: ${gaps.map(g => g.name).join(', ')}.`
    : "This pathway provides full coverage of your target skills.";
  
  const concentrationText = isOverConcentrated 
    ? `This path is highly concentrated in ${concentration[0].category} (${Math.round(concentration[0].percentage)}%).`
    : "This path offers a balanced distribution across skill categories.";

  const summary = `${pathway.title} includes ${pathwayModules.length} modules. ${gapText} ${concentrationText}`;

  return {
    coveredSkills,
    gaps,
    concentration,
    summary,
    isOverConcentrated
  };
};
