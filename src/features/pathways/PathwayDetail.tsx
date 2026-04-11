import type { GeneratedPathway, Module, CombinedDataset, PathwayDecision } from '../../types';
import { HumanReviewLayer } from '../governance/HumanReviewLayer';
import { validatePathwaySequence, calculateRationale } from '../../lib/pathwayEngine';

interface PathwayDetailProps {
  pathway: GeneratedPathway;
  dataset: CombinedDataset;
  initialDecision?: PathwayDecision;
}

export const PathwayDetail = ({ pathway, dataset, initialDecision }: PathwayDetailProps) => {
  const goal = dataset.learningGoals.find(g => g.id === pathway.learningGoalId);
  const modules = pathway.modules
    .map(mId => dataset.modules.find(m => m.id === mId))
    .filter((m): m is Module => !!m);

  const validityIssues = validatePathwaySequence(pathway, dataset);

  return (
    <div className="pathway-detail">
      <header className="detail-header" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{pathway.title}</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{pathway.rationale}</p>
      </header>

      {/* VALIDITY ALARMS */}
      {validityIssues.length > 0 && (
        <div className="validity-banner" style={{ 
          background: '#fef2f2', 
          border: '1px solid #ef4444', 
          padding: '1rem', 
          borderRadius: 'var(--radius-md)', 
          marginBottom: '2rem' 
        }}>
          <h4 style={{ color: '#991b1b', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            ⚠️ Sequence Integrity Warning
          </h4>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.9rem', color: '#b91c1c' }}>
            {validityIssues.map((issue, i) => (
              <li key={i}>{issue.message}</li>
            ))}
          </ul>
        </div>
      )}

      <h3>Curriculum Coherence & Sequencing</h3>
      <div className="progression-layout">
        {modules.map((module, index) => {
          const rationales = goal ? calculateRationale(module.id, goal, dataset) : [];
          return (
            <div key={`${module.id}-${index}`} className="progression-node">
              <div className="module-marker">{index + 1}</div>
              <div className="module-info">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h4>{module.title}</h4>
                </div>
                <p className="description">{module.description}</p>
                
                {/* RATIONALE TRANSPARENCY */}
                <div className="rationale-links" style={{ marginTop: '0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {rationales.map((r, i) => (
                    <span key={i} className="rationale-badge" style={{ 
                      fontSize: '0.7rem', 
                      background: 'var(--bg-secondary)', 
                      padding: '0.1rem 0.4rem', 
                      borderRadius: '4px',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-muted)'
                    }}>
                      {r}
                    </span>
                  ))}
                </div>

                <div className="module-metadata" style={{ marginTop: '1rem' }}>
                  <span className="duration">Duration: {module.duration}</span>
                  {module.prerequisites.length > 0 && (
                    <span className="prerequisites" style={{ color: validityIssues.some((i) => i.moduleId === module.id) ? '#ef4444' : 'inherit' }}>
                      Prerequisites: {module.prerequisites.map(p => 
                        dataset.modules.find(m => m.id === p)?.title || p
                      ).join(', ')}
                    </span>
                  )}
                </div>
                <div className="outcomes-badges">
                  {module.outcomes.map(sId => {
                    const skill = dataset.skills.find(s => s.id === sId);
                    return skill ? (
                      <span key={sId} className="skill-badge mini">{skill.name}</span>
                    ) : null;
                  })}
                </div>
              </div>
              {index < modules.length - 1 && (
                <div className="connector"></div>
              )}
            </div>
          );
        })}
      </div>

      <HumanReviewLayer 
        pathway={pathway} 
        initialDecision={initialDecision} 
        key={pathway.id} // Reset state when switching pathways
      />
    </div>
  );
};

