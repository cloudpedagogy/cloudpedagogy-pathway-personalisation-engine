import type { GeneratedPathway, Module, CombinedDataset, PathwayDecision } from '../../types';
import { HumanReviewLayer } from '../governance/HumanReviewLayer';

interface PathwayDetailProps {
  pathway: GeneratedPathway;
  dataset: CombinedDataset;
  initialDecision?: PathwayDecision;
}

export const PathwayDetail = ({ pathway, dataset, initialDecision }: PathwayDetailProps) => {
  const modules = pathway.modules
    .map(mId => dataset.modules.find(m => m.id === mId))
    .filter((m): m is Module => !!m);

  return (
    <div className="pathway-detail">
      <h3>Curriculum Coherence & Sequencing</h3>
      <div className="progression-layout">
        {modules.map((module, index) => (
          <div key={`${module.id}-${index}`} className="progression-node">
            <div className="module-marker">{index + 1}</div>
            <div className="module-info">
              <h4>{module.title}</h4>
              <p className="description">{module.description}</p>
              <div className="module-metadata">
                <span className="duration">Duration: {module.duration}</span>
                {module.prerequisites.length > 0 && (
                  <span className="prerequisites">
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
        ))}
      </div>

      <HumanReviewLayer 
        pathway={pathway} 
        initialDecision={initialDecision} 
        key={pathway.id} // Reset state when switching pathways
      />
    </div>
  );
};
