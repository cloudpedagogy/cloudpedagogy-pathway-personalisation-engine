import type { GeneratedPathway, Module } from '../../types';

interface PathwayCardProps {
  pathway: GeneratedPathway;
  modules: Module[];
  isActive: boolean;
  onSelect: () => void;
}

export const PathwayCard = ({ pathway, modules, isActive, onSelect }: PathwayCardProps) => {
  return (
    <div className={`pathway-card ${isActive ? 'active' : ''}`} onClick={onSelect}>
      <header className="pathway-header">
        <h3>{pathway.title}</h3>
        <span className="skill-coverage">
          Capability Alignment: {pathway.skillCoverageCount}
        </span>
      </header>
      <div className="logic-panel">
        <strong>Progression Logic:</strong>
        <p className="rationale">{pathway.rationale}</p>
      </div>
      
      <div className="module-timeline">
        {pathway.modules.map((mId, index) => {
          const mod = modules.find(m => m.id === mId);
          return (
            <div key={mId} className="module-node">
              <span className="step-num">{index + 1}</span>
              <div className="module-details">
                <span className="module-title">{mod?.title || mId}</span>
                <span className="module-duration">{mod?.duration}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
