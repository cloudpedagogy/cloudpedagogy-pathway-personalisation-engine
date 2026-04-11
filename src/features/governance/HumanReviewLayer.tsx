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
    sequencing: false,
    coverage: false,
    workload: false,
    alignment: false,
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
    <div className="human-review-layer" style={{ borderTop: '2px solid var(--border-color)', marginTop: '3rem', paddingTop: '2rem' }}>
      <header className="review-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>✅ Human-in-the-loop Governance Review</h3>
        <span className={`tag-pill status-${status}`} style={{ fontSize: '0.8rem', fontWeight: 700 }}>{status.toUpperCase()}</span>
      </header>

      <div className="review-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 1.5fr', gap: '2rem' }}>
        <div className="checklist-section" style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius-md)' }}>
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1rem' }}>Governance Checklist</h4>
          <ul className="review-checklist" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <li>
              <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input type="checkbox" checked={checklist.sequencing} onChange={() => handleCheck('sequencing')} />
                Sequence Integrity & Prerequisites Verified
              </label>
            </li>
            <li>
              <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input type="checkbox" checked={checklist.coverage} onChange={() => handleCheck('coverage')} />
                Requirement Coverage & Skill Alignment
              </label>
            </li>
            <li>
              <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input type="checkbox" checked={checklist.workload} onChange={() => handleCheck('workload')} />
                Workload Balance & Multi-Stage Feasibility
              </label>
            </li>
            <li>
              <label style={{ display: 'flex', gap: '0.75rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                <input type="checkbox" checked={checklist.alignment} onChange={() => handleCheck('alignment')} />
                Final Academic Lead Alignment Check
              </label>
            </li>
          </ul>
        </div>

        <div className="notes-section">
          <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '1rem' }}>Decision Notes</h4>
          <textarea 
            value={notes} 
            onChange={(e) => setNotes(e.target.value)}
            style={{ width: '100%', minHeight: '120px', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '1rem' }}
            placeholder="Document reasoning for decision or specified revisions..."
          />
          
          <div className="review-actions" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <select 
              value={status} 
              onChange={(e) => setStatus(e.target.value as DecisionStatus)}
              style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
            >
              <option value="pending">PENDING ADVISOR REVIEW</option>
              <option value="accepted">ACCEPTED FOR PATHWAY</option>
              <option value="revision">REVISION REQUIRED</option>
              <option value="unsuitable">NOT RECOMMENDED</option>
            </select>
            <button className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }} onClick={handleSave}>Finalize Decisions</button>
          </div>
        </div>
      </div>
    </div>
  );
};

