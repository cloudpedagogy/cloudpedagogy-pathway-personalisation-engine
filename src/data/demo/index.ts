import type { CombinedDataset } from '../../types';

export const healthcareDemoDataset: CombinedDataset = {
  skills: [
    { id: 'sk-1', name: 'Epidemiological Study Design', category: 'Research Methods' },
    { id: 'sk-2', name: 'Biostatistical Analysis', category: 'Health Data Science' },
    { id: 'sk-3', name: 'Causal Inference Methodologies', category: 'Research Theory' },
    { id: 'sk-4', name: 'Health Systems Thinking', category: 'Policy & Systems' },
    { id: 'sk-5', name: 'Policy Analysis Frameworks', category: 'Governance' },
    { id: 'sk-6', name: 'Health Governance & Accountability', category: 'Public Health Leadership' },
    { id: 'sk-7', name: 'International Health Implementation', category: 'Global Health Practice' },
    { id: 'sk-8', name: 'Programme Monitoring & Evaluation', category: 'Systems Management' },
    { id: 'sk-9', name: 'Cultural Competence in Health', category: 'Applied Ethics' },
    { id: 'sk-10', name: 'Public Health Data Management', category: 'Informatics' },
    { id: 'sk-11', name: 'Health Information Security', category: 'Digital Health Governance' },
    { id: 'sk-12', name: 'Digital Intervention Design', category: 'Innovation' },
    { id: 'sk-13', name: 'Interdisciplinary Coordination', category: 'Integrated Care' },
    { id: 'sk-14', name: 'Population Health Analysis', category: 'Clinical Integration' },
    { id: 'sk-15', name: 'Clinical Reasoning for Public Health', category: 'Clinical Practice' }
  ],
  learningGoals: [
    {
      id: 'lg-1',
      title: 'Epidemiological Research Pathway',
      description: 'Design and conduct rigorous population health studies, focusing on sophisticated data interpretation and causal inference.',
      targetSkills: ['sk-1', 'sk-2', 'sk-3', 'sk-14']
    },
    {
      id: 'lg-2',
      title: 'Health Policy and Systems Pathway',
      description: 'Analyse and shape health systems and policy decisions through advanced systems thinking and governance frameworks.',
      targetSkills: ['sk-4', 'sk-5', 'sk-6', 'sk-8']
    },
    {
      id: 'lg-3',
      title: 'Global Health Practice Pathway',
      description: 'Work in international and community-based health contexts, focusing on programme implementation and stakeholder coordination.',
      targetSkills: ['sk-7', 'sk-9', 'sk-13', 'sk-15']
    },
    {
      id: 'lg-4',
      title: 'Health Data and Analytics Pathway',
      description: 'Use data to generate insights for health decision-making, mastering statistical modelling and reproducible analysis.',
      targetSkills: ['sk-2', 'sk-10', 'sk-11', 'sk-14']
    },
    {
      id: 'lg-5',
      title: 'Digital Health and Innovation Pathway',
      description: 'Design and evaluate digital tools for health systems, focusing on user-centred design and evaluation methods.',
      targetSkills: ['sk-10', 'sk-11', 'sk-12', 'sk-8']
    },
    {
      id: 'lg-6',
      title: 'Clinical and Public Health Integration Pathway',
      description: 'Bridge clinical practice with population-level health strategies through interdisciplinary coordination and prevention strategies.',
      targetSkills: ['sk-13', 'sk-14', 'sk-15', 'sk-4']
    }
  ],
  modules: [
    {
      id: 'mod-1',
      title: 'Introduction to Epidemiology',
      description: 'Foundational principles of disease distribution, frequency, and determinants in population cohorts.',
      prerequisites: [],
      outcomes: ['sk-1'],
      duration: '5 weeks'
    },
    {
      id: 'mod-2',
      title: 'Biostatistics for Health Research',
      description: 'Systematic statistical methods for analyzing complex health data and research findings.',
      prerequisites: ['mod-1'],
      outcomes: ['sk-2'],
      duration: '8 weeks'
    },
    {
      id: 'mod-3',
      title: 'Health Systems and Policy',
      description: 'Analysing the structure, governance, and financing of health systems across diverse international contexts.',
      prerequisites: [],
      outcomes: ['sk-4', 'sk-5'],
      duration: '6 weeks'
    },
    {
      id: 'mod-4',
      title: 'Global Health in Practice',
      description: 'Developing capabilities for programme implementation and stakeholder engagement in international health environments.',
      prerequisites: ['mod-3'],
      outcomes: ['sk-7', 'sk-9'],
      duration: '10 weeks'
    },
    {
      id: 'mod-5',
      title: 'Public Health Data Management',
      description: 'Principles of secure data collection, storage, and processing within health information systems.',
      prerequisites: ['mod-2'],
      outcomes: ['sk-10'],
      duration: '4 weeks'
    },
    {
      id: 'mod-6',
      title: 'Digital Health Design',
      description: 'Evaluating and designing digital interventions for patient care and health systems management.',
      prerequisites: ['mod-5'],
      outcomes: ['sk-12', 'sk-11'],
      duration: '12 weeks'
    },
    {
      id: 'mod-7',
      title: 'Implementation Science',
      description: 'Exploring methodologies for translating healthcare research into routine clinical and public health practice.',
      prerequisites: ['mod-1', 'mod-3'],
      outcomes: ['sk-13'],
      duration: '7 weeks'
    },
    {
      id: 'mod-8',
      title: 'Evaluation Methods in Health',
      description: 'Mastering the tools for rigorous qualitative and quantitative evaluation of health programmes.',
      prerequisites: ['mod-7'],
      outcomes: ['sk-8'],
      duration: '9 weeks'
    },
    {
      id: 'mod-9',
      title: 'Health Inequalities',
      description: 'A deep analysis of the social determinants of health and structural drivers of healthcare disparity.',
      prerequisites: [],
      outcomes: ['sk-14', 'sk-4'],
      duration: '15 weeks'
    },
    {
      id: 'mod-10',
      title: 'Programme Monitoring and Evaluation (M&E)',
      description: 'Developing key indicators and governance frameworks for tracking health project progress.',
      prerequisites: ['mod-3'],
      outcomes: ['sk-6', 'sk-8'],
      duration: '5 weeks'
    },
    {
      id: 'mod-11',
      title: 'Research Methods for Public Health',
      description: 'Sophisticated study design and causal inference techniques for rigorous population health investigation.',
      prerequisites: ['mod-1', 'mod-2'],
      outcomes: ['sk-3'],
      duration: '10 weeks'
    },
    {
      id: 'mod-12',
      title: 'Community Health Strategy',
      description: 'Collaborative strategies for designing community-based health interventions and engagement models.',
      prerequisites: ['mod-4'],
      outcomes: ['sk-13', 'sk-9'],
      duration: '8 weeks'
    },
    {
      id: 'mod-13',
      title: 'Applied Population Health Analysis',
      description: 'Bridging clinical reasoning with large-scale population health data for integrated care delivery.',
      prerequisites: ['mod-11', 'mod-7'],
      outcomes: ['sk-15', 'sk-14'],
      duration: '12 weeks'
    }
  ],
  pathwayTemplates: [
    {
      id: 'pt-1',
      title: 'Epidemiological Excellence',
      description: 'A standardized route for high-level research capabilities in disease investigation.',
      recommendedModules: ['mod-1', 'mod-2', 'mod-11', 'mod-13']
    },
    {
      id: 'pt-2',
      title: 'Health Systems Leadership',
      description: 'Standardized pathways for professional health policy and systems design.',
      recommendedModules: ['mod-3', 'mod-10', 'mod-8', 'mod-9']
    },
    {
      id: 'pt-3',
      title: 'Global Health Coordination',
      description: 'A vetted pathway for international health programme management.',
      recommendedModules: ['mod-3', 'mod-4', 'mod-12', 'mod-8']
    },
    {
      id: 'pt-4',
      title: 'Health Data Analytics Strategy',
      description: 'A rigorous pathway for mastering health informatics and statistical models.',
      recommendedModules: ['mod-2', 'mod-5', 'mod-11', 'mod-6']
    }
  ]
};
