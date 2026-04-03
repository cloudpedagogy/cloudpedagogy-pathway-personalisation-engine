import type { ValidationIssue } from '../../lib/validation/validator';

interface ValidationSummaryProps {
  issues: ValidationIssue[];
}

export const ValidationSummary = ({ issues }: ValidationSummaryProps) => {
  if (issues.length === 0) return null;

  const errors = issues.filter(i => i.level === 'error');

  return (
    <div className={`validation-summary ${errors.length > 0 ? 'has-errors' : 'has-warnings'}`}>
      <div className="summary-header">
        <strong>Curriculum Data Integrity Check:</strong> {issues.length} inconsistency(ies) detected.
      </div>
      <ul className="issue-list">
        {issues.map((issue, idx) => (
          <li key={idx} className={`issue-item ${issue.level}`}>
            <span className="issue-type">[{issue.type.toUpperCase()}]</span>
            <span className="issue-message">{issue.message}</span>
            {issue.id && <span className="issue-id">(ID: {issue.id})</span>}
          </li>
        ))}
      </ul>
      <p className="summary-footer">
        {errors.length > 0 
          ? "Critical data inconsistencies may invalidate automated curriculum sequencing. Please verify the integrity of your dataset."
          : "Warnings indicate incomplete alignment but structured sequencing remains functional."}
      </p>
    </div>
  );
};
