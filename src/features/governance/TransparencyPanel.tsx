import { useState } from 'react';
import type { GeneratedPathway } from '../../types';

interface TransparencyPanelProps {
  pathway: GeneratedPathway;
}

export const TransparencyPanel = ({ pathway }: TransparencyPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`transparency-panel-container ${isOpen ? 'open' : ''}`}>
      <button 
        className="transparency-toggle" 
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        {isOpen ? 'Hide Reasoning' : 'Show Reasoning 🔍'}
      </button>

      {isOpen && (
        <div className="transparency-content" onClick={(e) => e.stopPropagation()}>
          <h4>Why this pathway was suggested:</h4>
          <ul>
            <li><strong>Intent Alignment:</strong> Prioritises modules mapped to the <em>{pathway.title.split(' ')[0]}</em> capability area.</li>
            <li><strong>Progression Logic:</strong> Follows a <em>Foundational → Applied → Advanced</em> sequence based on prerequisite strings.</li>
            <li><strong>Capability Density:</strong> Aims for a core alignment score of {pathway.skillCoverageCount} unique target competencies.</li>
            <li><strong>Strategy:</strong> {pathway.rationale}</li>
          </ul>
          <p className="governance-badge">Governance-ready design</p>
        </div>
      )}
    </div>
  );
};
