import React, { useState } from 'react';
import type { CombinedDataset } from '../../types';

interface Props {
  dataset: CombinedDataset;
  onChange?: (notes: { capabilityNotes?: string; governanceNotes?: string }) => void;
}

export const CapabilityGovernanceNotes: React.FC<Props> = ({ dataset, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Lightweight capability and governance layer
  // Optional, non-blocking, and does not alter core workflow
  return (
    <div style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          color: '#555',
          fontSize: '0.875rem',
          cursor: 'pointer',
          textDecoration: 'underline'
        }}
      >
        {isOpen ? 'Hide' : 'Show'} Capability & Governance Notes (Optional)
      </button>

      {isOpen && (
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', color: '#333', fontSize: '0.875rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Capability Notes</label>
            <textarea
              style={{ width: '100%', minHeight: '60px', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: '#fafafa', color: '#333' }}
              value={dataset.capabilityNotes || ''}
              onChange={(e) => onChange?.({ capabilityNotes: e.target.value })}
              placeholder="What capability this supports, suggested AI use pattern, reflection..."
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: 'bold' }}>Governance Notes</label>
            <textarea
              style={{ width: '100%', minHeight: '60px', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', background: '#fafafa', color: '#333' }}
              value={dataset.governanceNotes || ''}
              onChange={(e) => onChange?.({ governanceNotes: e.target.value })}
              placeholder="AI involvement, assumptions, risks, rationale, review notes..."
            />
          </div>
        </div>
      )}
    </div>
  );
};
