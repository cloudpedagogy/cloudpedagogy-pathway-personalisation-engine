import { useState } from 'react';

export const AssumptionsLimitations = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="governance-accordion">
      <button 
        className="accordion-header" 
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="icon">⚠️</span>
        <strong>Assumptions & System Limitations</strong>
        <span className="toggle-icon">{isOpen ? '−' : '+'}</span>
      </button>
      
      {isOpen && (
        <div className="accordion-content">
          <ul className="limitations-list">
            <li><strong>Metadata Dependency:</strong> Pathway outputs depend entirely on available module and skill metadata.</li>
            <li><strong>Indicative Nature:</strong> Suggestions are indicative templates for exploration, not prescriptive curriculum mandates.</li>
            <li><strong>Coherence vs. Suitability:</strong> Structural coherence does not guarantee suitability for every individual learner or context.</li>
            <li><strong>Professional Interpretation:</strong> All outputs require interpretation and validation by qualified academic staff.</li>
          </ul>
        </div>
      )}
    </div>
  );
};
