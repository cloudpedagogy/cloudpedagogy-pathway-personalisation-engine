import type { LearningGoal } from '../../types';

interface GoalSelectorProps {
  goals: LearningGoal[];
  selectedGoalId: string | null;
  onSelectGoal: (goalId: string) => void;
}

export const GoalSelector = ({ goals, selectedGoalId, onSelectGoal }: GoalSelectorProps) => {
  return (
    <div className="goal-selector">
      <h3>Select Pathway Intent</h3>
      <div className="goal-cards">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className={`goal-card ${selectedGoalId === goal.id ? 'active' : ''}`}
            onClick={() => onSelectGoal(goal.id)}
          >
            <h4>{goal.title}</h4>
            <p>{goal.description}</p>
            <div className="skill-count">
              Target Capabilities: {goal.targetSkills.length}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
