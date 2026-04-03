import type { AlignmentAnalysis } from '../../lib/alignment/skillMapper';

interface SkillAlignmentViewProps {
  analysis: AlignmentAnalysis;
}

export const SkillAlignmentView = ({ analysis }: SkillAlignmentViewProps) => {
  return (
    <div className="skill-alignment-view">
      <h3>Capability Mapping & Alignment</h3>
      <p className="analysis-summary">{analysis.summary}</p>

      {analysis.isOverConcentrated && (
        <div className="warning">
          <strong>Specialisation Note:</strong> This pathway is heavily weighted towards a specific capability category.
        </div>
      )}

      <div className="alignment-grid">
        <div className="covered-column">
          <h4>Mapped Capabilities</h4>
          <ul className="skill-list">
            {analysis.coveredSkills.map(({ skill, count }) => (
              <li key={skill.id} className="skill-item">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-badge covered">Aligned ({count}x)</span>
                <span className="skill-category">{skill.category}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="gaps-column">
          <h4>Pending Alignment Gaps</h4>
          {analysis.gaps.length > 0 ? (
            <ul className="skill-list">
              {analysis.gaps.map((skill) => (
                <li key={skill.id} className="skill-item gap">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-badge gap">Unaligned</span>
                  <span className="skill-category">{skill.category}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state">Full capability alignment achieved relative to intent.</div>
          )}
        </div>
      </div>
    </div>
  );
};
