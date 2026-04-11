# Pathway Personalisation Engine — User Instructions

---
### 2. What This Tool Does
This application dynamically generates and manages personalized elective pathways for learners. It aligns a student's chosen modules against institutional progression rules and professional frameworks to ensure their pathway remains coherent and valid.

---
### 3. Role in the Ecosystem
- **Phase:** Phase 4 — Curriculum Extensions
- **Role:** Designing learner pathways aligned to professional frameworks.
- **Reference:** [../SYSTEM_OVERVIEW.md](../SYSTEM_OVERVIEW.md)

---
### 4. When to Use This Tool
- During student advising and enrollment periods to help design a legitimate pathway.
- When mapping how a customized sequence of modules will still meet final professional accreditation requirements.
- To detect if a student's proposed choices create an illegal or structurally deficient program.

---
### 5. Inputs
- Requires a structured curriculum baseline (JSON).
- Input identifying the specific student context or selected modular choices.

---
### 6. How to Use (Step-by-Step)
1. Load the core programme structure.
2. Select the intended specialist track or allow manual selection of available elective modules.
3. Review the engine's assessment of coherence; it will flag missing prerequisites or credit imbalances.
4. Check the generated "Progression Map" to confirm all mandatory skills are met by the chosen pathway.
5. Lock the pathway and export the final personalized structure constraint map.

---
### 7. Key Outputs
- A validated, student-specific progression structure mapping required outcomes.
- Warnings detailing why a selected pathway might be incompatible or non-compliant.

---
### 8. How It Connects to Other Tools
- **Upstream:** Consumes rules and module structures generated in the **Mapping Engine**.
- **Downstream:** A finalized pathway can be passed back into the **Simulation Tool** to test workload on a per-student-route basis.

---
### 9. Limitations
- It is a structural rules engine; it does not replace human academic advising.
- Cannot process scheduling logic (like timetable clashes) unless such metadata is explicitly included in the schema.

---
### 10. Tips
- The visualization emphasizes prerequisites: watch for "bottleneck" modules that are required by many subsequent specialization choices.
