import { useState } from 'react';
import type { GeneratedPathway, PathwayDecision, DecisionStatus } from '../../types';
import { saveDecision } from '../../lib/storage';

interface HumanReviewLayerProps {
  pathway: GeneratedPathway;
  initialDecision?: PathwayDecision;
}

export const HumanReviewLayer = ({ pathway, initialDecision }: HumanReviewLayerProps) => {
  const [status, setStatus] = useState<DecisionStatus>(initialDecision?.status || 'pending');
  const [notes, setNotes] = useState(initialDecision?.notes || '');
  const [checklist, setChecklist] = useState<Record<string, boolean>>(initialDecision?.checklist || {
    intent: false,
    capabilities: false,
    workload: false,
    academic: false,
  });

  const handleCheck = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    const decision: PathwayDecision = {
      pathwayId: pathway.id,
      status,
      notes,
      reviewDate: new Date().toISOString(),
      checklist,
    };
    saveDecision(decision);
    alert('Academic review saved for this pathway.');
  };

  return (
    <div className="human-review-layer">
      <header className="review-header">
        <h3>✅ Human-in-the-loop Governance Review</h3>
        <span className={`status-badge ${status}`}>{status.toUpperCase()}</span>
      </header>

      <div className="review-grid">
        <div className="checklist-section">
          <h4>Reflective Review Checklist</h4>
          <ul className="review-checklist">
            <li>
              <label>
                <input type="checkbox" checked={checklist.intent} onChange={() => handleCheck('intent')} />
                Does this align with overall programme intent?
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" checked={checklist.capabilities} onChange={() => handleCheck('capabilities')} />
                Are any core capabilities underrepresented?
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" checked={checklist.workload} onChange={() => handleCheck('workload')} />
                Is the study workload balanced?
              </label>
            </li>
            <li>
              <label>
                <input type="checkbox" checked={checklist.academic} onChange={() => handleCheck('academic')} />
                Has an academic lead reviewed this route?
              </label>
            </li>
          </ul>
        </div>

        <div className="notes-section">
          <h4>Decision Notes (Stored Locally)</h4>
          <textarea 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add reasoning for this decision or required revisions..."
          />
          
          <div className="review-actions">
            <select value={status} onChange={(e) => setStatus(e.target.value as DecisionStatus)}>
              <option value="pending">PENDING REVIEW</option>
              <option value="accepted">ACCEPTED FOR DISCUSSION</option>
              <option value="revision">NEEDS REVISION</option>
              <option value="unsuitable">NOT SUITABLE</option>
            </select>
            <button className="btn btn-secondary" onClick={handleSave}>Save Review</button>
          </div>
        </div>
      </div>
    </div>
  );
};
