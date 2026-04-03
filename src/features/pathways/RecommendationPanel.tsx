import type { PathwaySuggestion } from '../../lib/generation/suggestions';

interface RecommendationPanelProps {
  suggestions: PathwaySuggestion[];
}

export const RecommendationPanel = ({ suggestions }: RecommendationPanelProps) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="recommendation-panel">
      <div className="recommendation-header">
        <span className="ai-icon">✨</span>
        <h3>Curriculum Extension Insights</h3>
        <p className="disclaimer-mini">
          Optional suggestions to enhance pathway coherence. These do not replace professional academic judgement.
        </p>
      </div>

      <div className="suggestion-cards">
        {suggestions.map((suggestion) => (
          <div key={suggestion.id} className={`suggestion-card ${suggestion.type}`}>
            <span className="suggestion-type">{suggestion.type.toUpperCase()}</span>
            <h4>{suggestion.title}</h4>
            <p className="suggestion-description">{suggestion.description}</p>
            <div className="suggestion-rationale">
              <strong>Design Insight:</strong> {suggestion.rationale}
            </div>
          </div>
        ))}
      </div>

      <div className="disclosure-footer">
        "Insights are provided as a support for shared discovery. Final curriculum design and student outcomes remain the responsibility of users."
      </div>
    </div>
  );
};
