import type { CombinedDataset, GeneratedPathway, LearningGoal } from '../../types';

export interface ComparisonMetric {
  label: string;
  value: string | number;
  description: string;
  isHigherBetter: boolean;
}

export interface PathwayComparison {
  pathwayId: string;
  title: string;
  metrics: {
    moduleCount: ComparisonMetric;
    prereqDepth: ComparisonMetric;
    skillBreadth: ComparisonMetric;
    goalFit: ComparisonMetric;
  };
  tradeOff: string;
  isWinnerIn: string[];
}

export interface ComparisonReport {
  comparisons: PathwayComparison[];
  breadthWinner: string;
  depthWinner: string;
  balanceWinner: string;
}

export const comparePathways = (
  pathways: GeneratedPathway[],
  goal: LearningGoal,
  dataset: CombinedDataset
): ComparisonReport => {
  const reports: PathwayComparison[] = pathways.map(pw => {
    const depth = calculatePrereqDepth(pw.modules, dataset);
    const breadth = calculateSkillBreadth(pw.acquiredSkills, dataset);
    const fit = (pw.skillCoverageCount / goal.targetSkills.length) * 100;

    // Determine Trade-off Label
    let tradeOff = "Balanced Design Strategy";
    if (pw.title.includes("Focused")) tradeOff = "Tactical Efficiency";
    if (pw.title.includes("Comprehensive")) tradeOff = "Analytical & Research Rigor";
    if (pw.title.includes("Guided")) tradeOff = "Vetted Professional Standard";

    return {
      pathwayId: pw.id,
      title: pw.title,
      metrics: {
        moduleCount: {
          label: "Modules",
          value: pw.modules.length,
          description: "Total number of learning units",
          isHigherBetter: false
        },
        prereqDepth: {
          label: "Step Depth",
          value: depth,
          description: "Longest sequence of dependent modules",
          isHigherBetter: false
        },
        skillBreadth: {
          label: "Capability Breadth",
          value: breadth,
          description: "Unique capability categories addressed",
          isHigherBetter: true
        },
        goalFit: {
          label: "Intent Alignment",
          value: `${Math.round(fit)}%`,
          description: "Percentage of target capabilities met",
          isHigherBetter: true
        }
      },
      tradeOff,
      isWinnerIn: []
    };
  });

  // Determine Winners
  let breadthWinner = reports[0];
  let depthWinner = reports[0];
  let balanceWinner = reports[0];

  reports.forEach(r => {
    // Breadth Winner (Skill Categories)
    if (Number(r.metrics.skillBreadth.value) > Number(breadthWinner.metrics.skillBreadth.value)) {
      breadthWinner = r;
    }
    // Depth Winner (Total Modules / Prereq Depth)
    if (Number(r.metrics.moduleCount.value) > Number(depthWinner.metrics.moduleCount.value)) {
      depthWinner = r;
    }
    // Balance (Heuristic: High coverage with moderate modules)
    const currentBalance = (Number(r.metrics.goalFit.value.toString().replace('%', '')) / Number(r.metrics.moduleCount.value));
    const winBalance = (Number(balanceWinner.metrics.goalFit.value.toString().replace('%', '')) / Number(balanceWinner.metrics.moduleCount.value));
    if (currentBalance > winBalance) {
      balanceWinner = r;
    }
  });

  breadthWinner.isWinnerIn.push("Systems Perspective");
  depthWinner.isWinnerIn.push("Analytical Depth");
  balanceWinner.isWinnerIn.push("Applied Practice Orientation");

  return {
    comparisons: reports,
    breadthWinner: breadthWinner.title,
    depthWinner: depthWinner.title,
    balanceWinner: balanceWinner.title
  };
};

function calculatePrereqDepth(moduleIds: string[], dataset: CombinedDataset): number {
  let maxDepth = 0;
  const memo: Record<string, number> = {};

  function getDepth(mId: string): number {
    if (memo[mId]) return memo[mId];
    const mod = dataset.modules.find(m => m.id === mId);
    if (!mod || mod.prerequisites.length === 0) return 1;
    
    const d = 1 + Math.max(...mod.prerequisites.map(pId => getDepth(pId)));
    memo[mId] = d;
    return d;
  }

  moduleIds.forEach(id => {
    maxDepth = Math.max(maxDepth, getDepth(id));
  });

  return maxDepth;
}

function calculateSkillBreadth(skillIds: string[], dataset: CombinedDataset): number {
  const categories = new Set<string>();
  skillIds.forEach(sId => {
    const skill = dataset.skills.find(s => s.id === sId);
    if (skill?.category) categories.add(skill.category);
  });
  return categories.size;
}
