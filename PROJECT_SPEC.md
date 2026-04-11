# PROJECT_SPEC: cloudpedagogy-pathway-personalisation-engine

## 1. Repo Name
`cloudpedagogy-pathway-personalisation-engine`

## 2. One-Sentence Purpose
An AI-powered engine for generating and governing customized learning pathways based on specific student goals and capability gaps.

## 3. Problem the App Solves
Fixed, "one-size-fits-all" curricula fail to adapt to diverse student goals or professional backgrounds; provides a way to generate bespoke pathways without bypassing institutional quality controls.

## 4. Primary User / Audience
Students (pathway generation) and Academic Advisors (governance oversight).

## 5. Core Role in the CloudPedagogy Ecosystem
The "Personalization Layer"; uses a repository of structured modules to create dynamic student-facing sequences driven by goal-alignment and skill-coverage.

## 6. Main Entities / Data Structures
- **LearningGoal**: User-defined targets (Title, Description, Skills).
- **GeneratedPathway**: An AI-designed sequence of modules with explicit rationale and skill coverage mapping.
- **PathwayDecision**: The governance layer tracking a human advisor's decision (Accepted/Revision/Unsuitable) and audit checklist.
- **PathwayTemplate**: Predefined pathway skeletons for specific target roles.

## 7. Main User Workflows
1. **Goal Setting**: Student defines a professional or academic learning goal.
2. **Pathway Generation**: Engine proposes a sequence of modules including rationale and skill-gap analysis.
3. **Governance Review**: Academic advisor reviews the proposed pathway against a governance checklist.
4. **Acquisition**: User accepts the finalized, governed pathway for execution.

## 8. Current Features
- AI-driven pathway sequencing based on skill-prerequisite mapping.
- Rationale generation (why these modules match this goal).
- "Decision Gate" workflow requiring human advisor sign-off.
- Skill coverage and estimated completion time analysis.

## 9. Stubbed / Partial / Incomplete Features
- Detailed checklist items in `PathwayDecision` are listed as a flexible schema.

## 10. Import / Export and Storage Model
- **Storage**: Multi-namespace local storage (`p_engine_dataset`, `p_engine_pathways`, etc.).
- **Import/Export**: JSON-based full state serialization.

## 11. Relationship to Other CloudPedagogy Apps
Consumes `Module` and `Skill` data originally designed in the `mapping-engine` or stored in the `shared-module-repository`.

## 12. Potential Overlap or Duplication Risks
Might overlap with general curriculum tools; distinguished by its focus on the "Student Goal" as the primary driver rather than institutional "Intent."

## 13. Distinctive Value of This App
The only tool that explicitly mandates a "Human-in-the-Loop" governance decision (PathwayDecision) for every AI-generated personalized outcome.

## 14. Recommended Future Enhancements
(Inferred) Live tracking of "Skill Progress" that triggers dynamic pathway re-shaping as a student completes blocks.

## 15. Anything Unclear or Inferred from Repo Contents
Usage of both Module IDs and Skill IDs as "Prerequisites" creates a transitive dependency graph that is inferred to be resolved by the engine's core logic.
