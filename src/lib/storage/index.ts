import type { CombinedDataset, GeneratedPathway, LearningGoal, PathwayDecision } from '../../types';

const STORAGE_KEYS = {
  DATASET: 'p_engine_dataset_v2',
  USER_GOAL: 'p_engine_user_goal_v2',
  PATHWAYS: 'p_engine_pathways_v2',
  DECISIONS: 'p_engine_decisions_v2',
};

export const saveDataset = (dataset: CombinedDataset): void => {
  localStorage.setItem(STORAGE_KEYS.DATASET, JSON.stringify(dataset));
};

export const loadDataset = (): CombinedDataset | null => {
  const data = localStorage.getItem(STORAGE_KEYS.DATASET);
  return data ? JSON.parse(data) : null;
};

export const saveDecision = (decision: PathwayDecision): void => {
  const decisions = loadDecisions();
  decisions[decision.pathwayId] = decision;
  localStorage.setItem(STORAGE_KEYS.DECISIONS, JSON.stringify(decisions));
};

export const loadDecisions = (): Record<string, PathwayDecision> => {
  const data = localStorage.getItem(STORAGE_KEYS.DECISIONS);
  return data ? JSON.parse(data) : {};
};

export const saveUserGoal = (goal: LearningGoal): void => {
  localStorage.setItem(STORAGE_KEYS.USER_GOAL, JSON.stringify(goal));
};

export const loadUserGoal = (): LearningGoal | null => {
  const data = localStorage.getItem(STORAGE_KEYS.USER_GOAL);
  return data ? JSON.parse(data) : null;
};

export const savePathways = (pathways: GeneratedPathway[]): void => {
  localStorage.setItem(STORAGE_KEYS.PATHWAYS, JSON.stringify(pathways));
};

export const loadPathways = (): GeneratedPathway[] => {
  const data = localStorage.getItem(STORAGE_KEYS.PATHWAYS);
  return data ? JSON.parse(data) : [];
};

export const resetLocalData = (): void => {
  Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
};
