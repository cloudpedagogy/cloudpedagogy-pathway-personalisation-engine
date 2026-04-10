import { useState, useEffect } from 'react';
import './App.css';
import { BrandingHeader } from './components/BrandingHeader';
import { BrandingFooter } from './components/BrandingFooter';
import { healthcareDemoDataset } from './data/demo';
import { loadDataset, saveDataset, resetLocalData, loadDecisions } from './lib/storage';
import { generatePathways } from './lib/generation/engine';
import { analyzeSkillAlignment } from './lib/alignment/skillMapper';
import { comparePathways } from './lib/alignment/comparisonEngine';
import { validateDataset } from './lib/validation/validator';
import { getPathwaySuggestions } from './lib/generation/suggestions';
import { GoalSelector } from './features/goals/GoalSelector';
import { PathwayCard } from './features/pathways/PathwayCard';
import { PathwayDetail } from './features/pathways/PathwayDetail';
import { SkillAlignmentView } from './features/skills/SkillAlignmentView';
import { PathwayComparator } from './features/comparison/PathwayComparator';
import { ValidationSummary } from './features/validation/ValidationSummary';
import { MethodologyPanel } from './features/methodology/MethodologyPanel';
import { RecommendationPanel } from './features/pathways/RecommendationPanel';
import { LogicDisclosure } from './features/governance/LogicDisclosure';
import { AssumptionsLimitations } from './features/governance/AssumptionsLimitations';
import type { CombinedDataset, GeneratedPathway, PathwayDecision } from './types';

function App() {
  const [dataset, setDataset] = useState<CombinedDataset>(healthcareDemoDataset);

  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [generatedPathways, setGeneratedPathways] = useState<GeneratedPathway[]>([]);
  const [activePathwayId, setActivePathwayId] = useState<string | null>(null);
  const [decisions, setDecisions] = useState<Record<string, PathwayDecision>>({});

  // Load initial data from localStorage or use empty
  useEffect(() => {
    const savedData = loadDataset();
    if (savedData) {
      setDataset(savedData);
    } else {
      // Fallback to Healthcare Demo if no v2 data is found
      setDataset(healthcareDemoDataset);
    }
    
    // Load local governance decisions
    setDecisions(loadDecisions());
  }, []);

  // Update pathways when goal changes
  useEffect(() => {
    if (selectedGoalId) {
      const goal = dataset.learningGoals.find(g => g.id === selectedGoalId);
      if (goal) {
        const pathways = generatePathways(goal, dataset);
        setGeneratedPathways(pathways);
        setActivePathwayId(pathways[0]?.id || null);
      }
    } else {
      setGeneratedPathways([]);
      setActivePathwayId(null);
    }
  }, [selectedGoalId, dataset]);

  const handleLoadDemo = () => {
    setDataset(healthcareDemoDataset);
    setSelectedGoalId(null);
  };

  const handleSave = () => {
    saveDataset(dataset);
    alert('Curriculum state persisted to local storage.');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all curriculum data?')) {
      resetLocalData();
      setDataset({
        modules: [],
        skills: [],
        learningGoals: [],
        pathwayTemplates: [],
      });
      setSelectedGoalId(null);
    }
  };

  const selectedGoal = dataset.learningGoals.find(g => g.id === selectedGoalId);
  const activePathway = generatedPathways.find(p => p.id === activePathwayId);
  
  const validationIssues = validateDataset(dataset);

  const alignmentAnalysis = activePathway && selectedGoal
    ? analyzeSkillAlignment(activePathway, selectedGoal, dataset)
    : null;

  const comparisonReport = selectedGoal && generatedPathways.length > 1
    ? comparePathways(generatedPathways, selectedGoal, dataset)
    : null;

  const pathwaySuggestions = activePathway
    ? getPathwaySuggestions(activePathway, dataset)
    : [];

  return (
    <>
      <BrandingHeader />
      <div className="app-container">
      <header className="app-header">
        <h1>Pathway Personalisation Engine</h1>
        <p className="description">
          An academically grounded tool for designing and exploring coherent learning pathways aligned to professional capability frameworks.
        </p>
        
        <div className="action-bar">
          <button className="btn btn-primary" onClick={handleLoadDemo}>Load Demo Curriculum</button>
          <button className="btn btn-secondary" onClick={handleSave}>Persist State</button>
          <button className="btn btn-danger" onClick={handleReset}>Clear Data</button>
          <button className="btn btn-outline" onClick={() => alert('Coming soon!')}>Import Schema</button>
          <button className="btn btn-outline" onClick={() => alert('Coming soon!')}>Export Report</button>
        </div>
      </header>

      <main className="app-main">
        <ValidationSummary issues={validationIssues} />
        
        <div className="disclaimer">
          <strong>Transparency Notice:</strong> This tool supports the structured exploration of curriculum sequences. It does not prescribe decisions or replace professional academic judgement. Responsibility for curriculum choices and learner outcomes remains with users and their institutions.
        </div>

        <div className="governance-global-layer">
          <LogicDisclosure />
          <AssumptionsLimitations />
        </div>

        <div className="summary-cards">
          <div className="card">
            <h2>Current Curriculum</h2>
            <p className="card-value">{dataset.modules.length}</p>
            <p>Validated Components</p>
          </div>
          <div className="card">
            <h2>Pathway Intents</h2>
            <p className="card-value">{dataset.learningGoals.length}</p>
            <p>Defined Outcomes</p>
          </div>
          <div className="card">
            <h2>Pathway Sequence</h2>
            <p className="card-value">{activePathway?.modules.length || 0}</p>
            <p>Components in Route</p>
          </div>
          <div className="card">
            <h2>Capability Alignment</h2>
            <p className="card-value">{activePathway?.skillCoverageCount || 0}</p>
            <p>Target Competencies Met</p>
          </div>
        </div>

        <section className="selection-area">
          <GoalSelector 
            goals={dataset.learningGoals}
            selectedGoalId={selectedGoalId}
            onSelectGoal={setSelectedGoalId}
          />

          {selectedGoal && (
            <div className="pathways-section">
              <h2>Aligned Pathway Recommendations for: {selectedGoal.title}</h2>
              <div className="pathways-list">
                {generatedPathways.map((pathway) => (
                  <PathwayCard 
                    key={pathway.id}
                    pathway={pathway}
                    modules={dataset.modules}
                    isActive={activePathwayId === pathway.id}
                    onSelect={() => setActivePathwayId(pathway.id)}
                    decision={decisions[pathway.id]}
                  />
                ))}
              </div>

              {activePathway && alignmentAnalysis && (
                <div className="analysis-panels">
                  <SkillAlignmentView analysis={alignmentAnalysis} />
                  <PathwayDetail 
                    pathway={activePathway} 
                    dataset={dataset} 
                    initialDecision={decisions[activePathway.id]}
                  />
                  <RecommendationPanel suggestions={pathwaySuggestions} />
                </div>
              )}

              {comparisonReport && (
                <PathwayComparator report={comparisonReport} />
              )}
            </div>
          )}
        </section>

        <section id="methodology">
          <MethodologyPanel />
        </section>
      </main>
    </div>
    <BrandingFooter />
  </>
);
}

export default App;
