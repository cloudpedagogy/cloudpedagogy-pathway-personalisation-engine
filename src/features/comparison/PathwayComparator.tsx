import type { ComparisonReport } from '../../lib/alignment/comparisonEngine';

interface PathwayComparatorProps { report: ComparisonReport; }

export const PathwayComparator = ({ report }: PathwayComparatorProps) => {
  return (
    <div className="pathway-comparator">
      <div className="comparison-headline">
        <h3>Structural Pathway Evaluation</h3>
        <p>Comparative analysis of curriculum sequences based on breadth, depth, and coherence.</p>
        <div className="winner-highlights">
          <div className="winner-badge breadth">📊 Strategic Breadth: <strong>{report.breadthWinner}</strong></div>
          <div className="winner-badge depth">📚 Strategic Depth: <strong>{report.depthWinner}</strong></div>
          <div className="winner-badge balance">⚖️ Optimal Coherence: <strong>{report.balanceWinner}</strong></div>
        </div>
      </div>

      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Metric</th>
              {report.comparisons.map(c => (
                <th key={c.pathwayId}>{c.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Design Strategy</strong></td>
              {report.comparisons.map(c => (
                <td key={c.pathwayId} className="trade-off-cell">
                  <span className="trade-off-tag">{c.tradeOff}</span>
                </td>
              ))}
            </tr>
            <tr>
              <td>Curriculum Components</td>
              {report.comparisons.map(c => (
                <td key={c.pathwayId}>{c.metrics.moduleCount.value}</td>
              ))}
            </tr>
            <tr>
              <td>Sequencing Depth</td>
              {report.comparisons.map(c => (
                <td key={c.pathwayId}>{c.metrics.prereqDepth.value}</td>
              ))}
            </tr>
            <tr>
              <td>Capability Categories</td>
              {report.comparisons.map(c => (
                <td key={c.pathwayId}>{c.metrics.skillBreadth.value}</td>
              ))}
            </tr>
            <tr>
              <td>Alignment Fit</td>
              {report.comparisons.map(c => (
                <td key={c.pathwayId} className="fit-cell">{c.metrics.goalFit.value}</td>
              ))}
            </tr>
            <tr>
              <td><strong>Design Strengths</strong></td>
              {report.comparisons.map(c => (
                <td key={c.pathwayId}>
                  {c.isWinnerIn.length > 0 ? (
                    <div className="winner-labels">
                      {c.isWinnerIn.map(w => (
                        <span key={w} className="winner-label">{w}</span>
                      ))}
                    </div>
                  ) : (
                    <span className="no-win">-</span>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
