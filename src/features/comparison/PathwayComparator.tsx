import React from 'react';
import type { GeneratedPathway, CombinedDataset } from '../../types';
import { getPathwayDiff } from '../../lib/pathwayEngine';

interface PathwayComparatorProps {
  pathwayA: GeneratedPathway;
  pathwayB: GeneratedPathway;
  dataset: CombinedDataset;
}

export const PathwayComparator: React.FC<PathwayComparatorProps> = ({ pathwayA, pathwayB, dataset }) => {
  const diff = getPathwayDiff(pathwayA, pathwayB, dataset);

  const renderModuleList = (mIds: string[]) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      {mIds.map(id => {
        const mod = dataset.modules.find(m => m.id === id);
        return (
          <div key={id} style={{ 
            fontSize: '0.85rem', 
            padding: '0.5rem', 
            background: 'white', 
            border: '1px solid var(--border-color)', 
            borderRadius: '4px' 
          }}>
            {mod?.title || id}
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="pathway-comparator" style={{ padding: '1.5rem', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-lg)' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Side-by-Side Pathway Analysis</h3>
        <p style={{ color: 'var(--text-muted)' }}>Comparing "{pathwayA.title}" vs "{pathwayB.title}"</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* PATHWAY A UNIQUE */}
        <div className="comparison-column">
          <h4 style={{ fontSize: '0.9rem', color: '#111', borderBottom: '2px solid #3b82f6', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            Unique to A
          </h4>
          {diff.modules.onlyInP1.length > 0 ? (
            renderModuleList(diff.modules.onlyInP1)
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Identical module set</p>
          )}
          
          <div style={{ marginTop: '2rem' }}>
            <h5 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Skills exclusively gained</h5>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {diff.skills.onlyInP1.map((sId) => (
                <span key={sId} className="skill-badge mini">{dataset.skills.find(s => s.id === sId)?.name || sId}</span>
              ))}
            </div>
          </div>
        </div>

        {/* PATHWAY B UNIQUE */}
        <div className="comparison-column">
          <h4 style={{ fontSize: '0.9rem', color: '#111', borderBottom: '2px solid #8b5cf6', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
            Unique to B
          </h4>
          {diff.modules.onlyInP2.length > 0 ? (
            renderModuleList(diff.modules.onlyInP2)
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Identical module set</p>
          )}

          <div style={{ marginTop: '2rem' }}>
            <h5 style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Skills exclusively gained</h5>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {diff.skills.onlyInP2.map((sId) => (
                <span key={sId} className="skill-badge mini">{dataset.skills.find(s => s.id === sId)?.name || sId}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>Coverage Summary</h4>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pathway A Target Hit:</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{pathwayA.skillCoverageCount} Skills</div>
          </div>
          <div>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pathway B Target Hit:</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{pathwayB.skillCoverageCount} Skills</div>
          </div>
        </div>
      </div>
    </div>
  );
};

