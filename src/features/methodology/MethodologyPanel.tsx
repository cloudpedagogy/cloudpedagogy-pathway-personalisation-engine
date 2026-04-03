export const MethodologyPanel = () => {
  return (
    <div className="methodology-panel">
      <div className="panel-header">
        <h2>Curriculum Design Methodology</h2>
        <p>A transparent overview of the logic used to facilitate structured pathway exploration and curriculum coherence.</p>
      </div>

      <div className="methodology-grid">
        <section className="method-section">
          <h3>Pathway Generation Logic</h3>
          <p>
            The engine utilizes a deterministic, rule-based approach to assist in the exploration of training sequences:
          </p>
          <ul>
            <li><strong>Intent Mapping:</strong> Identifies curriculum components whose learning outcomes align with the target capabilities of a defined pathway intent.</li>
            <li><strong>Sequence Coherence:</strong> Recursively follows prerequisite chains to ensure that foundational concepts are introduced before advanced applications.</li>
            <li><strong>Structured Options:</strong> We provide diverse design strategies—Focused (efficient alignment), Guided (template-vetted), and Comprehensive (full capability breadth).</li>
          </ul>
        </section>

        <section className="method-section">
          <h3>Capability Alignment Analysis</h3>
          <p>
            Alignment is measured by cross-referencing the unique capability IDs provided by a pathway's modules against the target framework of the intent.
          </p>
          <ul>
            <li><strong>Alignment Ratio:</strong> The percentage of target capabilities addressed by the proposed module sequence.</li>
            <li><strong>Alignment Gaps:</strong> Explicitly identifies target capabilities currently unaddressed by the selected pathway for further curriculum review.</li>
            <li><strong>Capability Intensity:</strong> Evaluates the categorical weighting of the pathway to monitor for over-specialisation or imbalance.</li>
          </ul>
        </section>
      </div>

      <div className="limitations-panel">
        <h3>Transparency & Professional Practice</h3>
        <ul className="disclosure-list">
          <li><strong>Supports Structured Exploration:</strong> This tool facilitates the navigation of complex curriculum possibilities; it does not replace the collaborative design process.</li>
          <li><strong>Information Aid, Not Decision-Maker:</strong> The engine provides outputs based on pre-defined datasets; it does not possess autonomous authority over curriculum decisions.</li>
          <li><strong>Requires Academic Oversight:</strong> These pathways must be reviewed within the context of wider academic standards, pedagogical strategy, and learner needs.</li>
        </ul>
        <div className="final-disclaimer">
          "Responsibility for final curriculum choices and student outcomes remains with users and their institutions."
        </div>
      </div>
    </div>
  );
};
