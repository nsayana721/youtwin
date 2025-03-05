export interface Tutor {
  id: string;
  name: string;
  subject: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  imageUrl: string;
  description: string;
  lastUpdated: string;
  ageRange: '13-16' | '17-18' | '19-22';
  type: string;
  summary: string;
  keyQuestions: string[];
  terms: Term[];
  courseContent: CourseContent[];
}

interface Term {
  id: string;
  term: string;
  completed?: boolean;
}

interface CourseContent {
  id: string;
  type: 'video' | 'text' | 'audio';
  title: string;
  description: string;
  duration: string;
  imageUrl: string;
  videoUrl?: string;
  summary?: string;
  keyQuestions?: string[];
  terms?: Term[];
  content?: string;
}

export const mockTutors: Tutor[] = [
  {
    id: '1',
    name: 'Chris Anderson',
    subject: 'Biology',
    level: 'Intermediate',
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczMezj0SVEvlsNTfwbeIgsZ1aVoC-vkRlP9g0E5_sHgPyX8biSKe3slfomBftx5LitGDPuY149_QxDQgbqY1NB4ZRUyfH2tTrXOd3RQYuFt4c1LxoQoRgFPcAuXF6FkYsulg__xzK7Kt6tCRLjKeeOT9Mw=w1232-h928-s-no-gm?authuser=0',
    description: 'Comprehensive biology course covering cellular structures, genetics, and evolutionary biology. Perfect for high school and college preparation.',
    lastUpdated: '2025-02-19',
    ageRange: '17-18',
    type: 'Science Education',
    summary: 'This comprehensive biology course covers fundamental concepts in cellular biology, genetics, and evolution. Students will gain a deep understanding of biological processes through interactive lessons, practical experiments, and real-world applications.',
    keyQuestions: [
      'How do cells maintain homeostasis?',
      'What are the mechanisms of genetic inheritance?',
      'How does natural selection drive evolution?',
      'What role do enzymes play in cellular processes?',
      'How do organisms adapt to their environment?'
    ],
    terms: [
      { id: 't1', term: 'Mitochondria' },
      { id: 't2', term: 'DNA Replication' },
      { id: 't3', term: 'Natural Selection' },
      { id: 't4', term: 'Cell Membrane' },
      { id: 't5', term: 'Protein Synthesis' }
    ],
    courseContent: [
      {
        id: 'v1',
        type: 'video',
        title: 'Cell Division and Mitosis',
        description: 'A comprehensive guide to understanding cell division and mitosis',
        duration: '20:15',
        videoUrl: 'https://www.youtube.com/watch?v=LUDws4JrIiI',
        imageUrl: 'https://img.youtube.com/vi/LUDws4JrIiI/maxresdefault.jpg',
        summary: 'Understand how cells divide and reproduce through mitosis. Learn about the cell cycle, chromosomes, and the stages of mitosis.',
        keyQuestions: [
          'What are the stages of the cell cycle?',
          'How do chromosomes separate during mitosis?',
          'What controls cell division?',
          'What happens during each phase of mitosis?',
          'Why is mitosis important for organisms?'
        ],
        terms: [
          { id: 'v3t1', term: 'Prophase' },
          { id: 'v3t2', term: 'Metaphase' },
          { id: 'v3t3', term: 'Anaphase' },
          { id: 'v3t4', term: 'Telophase' },
          { id: 'v3t5', term: 'Cytokinesis' }
        ]
      },
      {
        id: 't1',
        type: 'text',
        title: 'Evolution and Natural Selection',
        description: 'A comprehensive guide to understanding evolutionary processes',
        duration: '30 min read',
        imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=60',
        summary: 'Explore the theory of evolution and natural selection. Learn about adaptation, speciation, and the evidence supporting evolutionary theory.',
        content: `
          Evolution by natural selection is one of the most fundamental and far-reaching concepts in biology. First proposed by Charles Darwin in his groundbreaking work "On the Origin of Species" (1859), this theory explains how populations of organisms change over time through a process that Darwin called "descent with modification."

          The theory is built on several key observations:
          1. All species produce more offspring than can survive
          2. Offspring vary in their traits
          3. Some variations are heritable
          4. Resources are limited

          These observations lead to the logical conclusion that individuals with advantageous traits are more likely to survive and reproduce, passing these traits to their offspring. Over time, this process results in populations becoming better adapted to their environment.

          Evidence for evolution comes from multiple sources:
          - Fossil Record: Preserved remains show how species changed over time
          - Comparative Anatomy: Similar structures in different species suggest common ancestry
          - Molecular Biology: DNA similarities between species indicate evolutionary relationships
          - Biogeography: Species distribution patterns reflect evolutionary history

          Modern evolutionary theory combines Darwin's insights with our understanding of genetics, leading to the Modern Synthesis. This framework explains both small-scale changes within populations and large-scale evolutionary patterns across the tree of life.
        `,
        keyQuestions: [
          'What is natural selection?',
          'How do species adapt to their environment?',
          'What evidence supports evolution?',
          'How do new species form?',
          'What role does genetics play in evolution?'
        ],
        terms: [
          { id: 't2t1', term: 'Natural Selection' },
          { id: 't2t2', term: 'Adaptation' },
          { id: 't2t3', term: 'Speciation' },
          { id: 't2t4', term: 'Fossil Record' },
          { id: 't2t5', term: 'Genetic Drift' }
        ]
      },
      {
        id: 't3',
        type: 'text',
        title: 'Cellular Respiration',
        description: 'Understanding cellular energy production',
        duration: '20 min read',
        imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&auto=format&fit=crop&q=60',
        summary: 'Learn about how cells break down glucose to produce energy through cellular respiration. Covers glycolysis, the Krebs cycle, and the electron transport chain.',
        content: `
          Cellular respiration is the process by which cells break down nutrients to produce energy in the form of ATP. This complex process involves multiple pathways and occurs in different cellular compartments.

          The process can be divided into three main stages:

          1. Glycolysis
          - Occurs in the cytoplasm
          - Breaks down glucose into pyruvate
          - Produces a net 2 ATP molecules
          - Can occur with or without oxygen

          2. The Citric Acid Cycle (Krebs Cycle)
          - Takes place in the mitochondrial matrix
          - Completes the breakdown of glucose
          - Generates electron carriers (NADH and FADH₂)
          - Releases CO₂ as a waste product

          3. Electron Transport Chain
          - Located in the inner mitochondrial membrane
          - Uses electron carriers to generate a proton gradient
          - Produces the majority of ATP through chemiosmosis
          - Requires oxygen as the final electron acceptor

          The efficiency of cellular respiration is remarkable:
          - One glucose molecule can produce up to 36 ATP molecules
          - The process is regulated to match cellular energy demands
          - Alternative pathways exist for different nutrient sources
        `,
        keyQuestions: [
          'What are the stages of cellular respiration?',
          'How is ATP produced?',
          'What is the role of oxygen?',
          'How efficient is cellular respiration?',
          'What happens during anaerobic respiration?'
        ],
        terms: [
          { id: 't3t1', term: 'Glycolysis' },
          { id: 't3t2', term: 'Krebs Cycle' },
          { id: 't3t3', term: 'ATP Synthesis' },
          { id: 't3t4', term: 'Electron Transport' },
          { id: 't3t5', term: 'Fermentation' }
        ]
      },
      {
        id: 'a1',
        type: 'audio',
        title: 'Genetics and Inheritance',
        description: 'Understanding genetic inheritance',
        duration: '25:30',
        imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=60',
        summary: 'An in-depth audio lecture on genetic inheritance, covering Mendel\'s laws, inheritance patterns, and modern genetics.',
        keyQuestions: [
          'What are the basic principles of inheritance?',
          'How do genes get passed from parents to offspring?',
          'What are dominant and recessive traits?',
          'How do mutations affect inheritance?',
          'What role does DNA play in inheritance?'
        ],
        terms: [
          { id: 'a2t1', term: 'Genes' },
          { id: 'a2t2', term: 'Chromosomes' },
          { id: 'a2t3', term: 'Alleles' },
          { id: 'a2t4', term: 'Inheritance' },
          { id: 'a2t5', term: 'Mutation' }
        ]
      },
      {
        id: 'a3',
        type: 'audio',
        title: 'Cell Biology Basics',
        description: 'Introduction to cellular structures',
        duration: '19:45',
        imageUrl: 'https://images.unsplash.com/photo-1576319155264-99536e0be1ee?w=800&auto=format&fit=crop&q=60',
        summary: 'A beginner-friendly audio guide to cell biology, covering basic cellular structures and their functions.',
        keyQuestions: [
          'What are the main parts of a cell?',
          'How do cells maintain homeostasis?',
          'What is the role of the cell membrane?',
          'How do cells produce energy?',
          'What are the differences between cell types?'
        ],
        terms: [
          { id: 'a3t1', term: 'Cell Membrane' },
          { id: 'a3t2', term: 'Nucleus' },
          { id: 'a3t3', term: 'Mitochondria' },
          { id: 'a3t4', term: 'Endoplasmic Reticulum' },
          { id: 'a3t5', term: 'Golgi Apparatus' }
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'David Mitchell',
    subject: 'Mathematics',
    level: 'Advanced',
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczNCemIyEyBHlYstrD_Q0_xAks_wmuww07XtdTn3X6sNp0UU5GG4UvC34i06cFHvv9Y2PY8EI97q1w4358VOy-6-CoS-yo-LpXzhz059QGJzMu_1dsnqlNMTeOnZgOkGgIjaxXntfm-a5nZDYGCHtLHHww=w1232-h928-s-no-gm?authuser=0',
    description: 'Advanced mathematics course covering algebra, calculus, and statistics. Includes practice problems and step-by-step solutions.',
    lastUpdated: '2025-02-18',
    ageRange: '19-22',
    type: 'Mathematics Education',
    summary: 'Advanced mathematics course designed for university students and professionals. Covers complex mathematical concepts with practical applications in engineering and sciences.',
    keyQuestions: [
      'How do we apply calculus to real-world problems?',
      'What are the foundations of linear algebra?',
      'How do we analyze statistical data?',
      'What are the applications of differential equations?',
      'How do we prove mathematical theorems?'
    ],
    terms: [
      { id: 't1', term: 'Differential Calculus' },
      { id: 't2', term: 'Linear Algebra' },
      { id: 't3', term: 'Statistical Analysis' },
      { id: 't4', term: 'Mathematical Proofs' },
      { id: 't5', term: 'Complex Numbers' }
    ],
    courseContent: [
      {
        id: 'v1',
        type: 'video',
        title: 'Calculus Fundamentals',
        description: 'Introduction to differential and integral calculus',
        duration: '20:45',
        imageUrl: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=60'
      },
      {
        id: 't1',
        type: 'text',
        title: 'Linear Algebra Guide',
        description: 'Master the fundamentals of linear algebra',
        duration: '30 min read',
        imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=60',
        content: `
          Linear algebra is a fundamental branch of mathematics that deals with linear equations and linear functions. It has extensive applications in physics, engineering, computer graphics, and machine learning.

          Key Concepts:

          1. Vectors and Vector Spaces
          - Vectors represent magnitude and direction
          - Vector spaces are sets of vectors with specific properties
          - Subspaces are vector spaces within larger vector spaces

          2. Matrices and Matrix Operations
          - Matrices are rectangular arrays of numbers
          - Matrix addition and multiplication
          - Special matrices: identity, diagonal, symmetric

          3. Linear Transformations
          - Functions between vector spaces
          - Represented by matrices
          - Properties: linearity, kernel, image

          4. Eigenvalues and Eigenvectors
          - Special vectors that maintain their direction under transformation
          - Used in principal component analysis
          - Applications in computer graphics and physics

          Applications include:
          - Computer Graphics: 3D transformations
          - Data Science: Dimensionality reduction
          - Quantum Mechanics: State vectors
          - Engineering: System modeling
        `,
        summary: 'A comprehensive guide to linear algebra, covering vectors, matrices, transformations, and their applications in various fields.',
        keyQuestions: [
          'What are vector spaces and their properties?',
          'How do matrix operations work?',
          'What are eigenvalues and eigenvectors?',
          'How is linear algebra applied in real-world problems?'
        ],
        terms: [
          { id: 'la1', term: 'Vector Space' },
          { id: 'la2', term: 'Matrix' },
          { id: 'la3', term: 'Linear Transformation' },
          { id: 'la4', term: 'Eigenvalue' }
        ]
      },
      {
        id: 'a1',
        type: 'audio',
        title: 'Statistics in Practice',
        description: 'Learn practical applications of statistics',
        duration: '18:30',
        imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60',
        summary: 'A comprehensive overview of statistical methods and their practical applications in data analysis.',
        keyQuestions: [
          'What are the key statistical measures?',
          'How do we test hypotheses?',
          'What are confidence intervals?',
          'When should we use different statistical tests?'
        ],
        terms: [
          { id: 'st1', term: 'Mean' },
          { id: 'st2', term: 'Standard Deviation' },
          { id: 'st3', term: 'P-value' },
          { id: 'st4', term: 'Confidence Interval' }
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'Sarah Wilson',
    subject: 'Critical Thinking',
    level: 'One Year',
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczO8TI8-mpP0Qjxza6jftOhavf7jrJt5AvovjG8KBoPPNpC6W7Z5NHf6yz1gmQk5eOD_US9wZlMD8blVSM0B1W8uvw0Csxt0nPkGtgivXSO1L0H5NiJTeFBUy5AQf2Qu2mv71WFP1_oh9_V8ociJbv905Q=w1232-h928-s-no-gm?authuser=0',
    description: 'Learn essential critical thinking skills through real-world examples and interactive exercises. Develop analytical and problem-solving abilities.',
    lastUpdated: '2025-02-17',
    ageRange: '17-18',
    type: 'Critical Thinking',
    summary: 'A comprehensive course on critical thinking and analytical skills.',
    keyQuestions: [
      'How do we analyze arguments effectively?',
      'What are common logical fallacies?',
      'How can we improve decision-making?'
    ],
    terms: [
      { id: 't1', term: 'Logical Reasoning' },
      { id: 't2', term: 'Argumentation' },
      { id: 't3', term: 'Problem Solving' }
    ],
    courseContent: [
      {
        id: 'v1',
        type: 'video',
        title: 'Introduction to Critical Thinking',
        description: 'Learn the fundamentals of critical thinking',
        duration: '15:30',
        imageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&auto=format&fit=crop&q=60'
      }
    ]
  },
  {
    id: '4',
    name: 'Emma Thompson',
    subject: 'Chemistry',
    level: 'Two Year',
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczO5T1cM1dqUSpcV9_FCt1ujhjL8E6yesJ5vXooH9EO38AaS-lQl9pNntrhBUyu0x683zrFP84IUzxabAk2GQMa0-VCI4pAMi_gT0VFOTP-xyJd7WqIpi1nKLX0-TY68yxsn93JrOuA8o5-zawshPsquSw=w1232-h928-s-no-gm?authuser=0',
    description: 'Comprehensive chemistry course covering organic, inorganic, and physical chemistry. Includes virtual lab experiments.',
    lastUpdated: '2025-02-16',
    ageRange: '17-18',
    type: 'Chemistry Education',
    summary: 'A comprehensive chemistry course covering all major areas.',
    keyQuestions: [
      'What are the fundamental principles of chemistry?',
      'How do chemical reactions work?',
      'What is the periodic table structure?'
    ],
    terms: [
      { id: 't1', term: 'Chemical Bonds' },
      { id: 't2', term: 'Periodic Table' },
      { id: 't3', term: 'Reactions' }
    ],
    courseContent: [
      {
        id: 'v1',
        type: 'video',
        title: 'Introduction to Chemistry',
        description: 'Basic principles of chemistry',
        duration: '18:45',
        imageUrl: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=800&auto=format&fit=crop&q=60'
      }
    ]
  },
  {
    id: '5',
    name: 'Michael Brown',
    subject: 'Physics',
    level: 'Two Year',
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczPz_kLCMMa14w1FfiEIcIlvnggZB4pqlmj5X6JwiGtQgUkVP8hm98ogGYZOegTrIo0bU5hmUr0cz-p94LbMCM7xTCjbFYVb_UEhMnXdpdRH8EllEYXenUTLcml5Lt3YxgU-5fzYNisEme6tKcAQ3hY3bw=w1232-h928-s-no-gm?authuser=0',
    description: 'In-depth physics course covering mechanics, thermodynamics, and quantum physics. Includes interactive simulations and problem sets.',
    lastUpdated: '2025-02-15',
    ageRange: '17-18',
    type: 'Physics Education',
    summary: 'A comprehensive physics course with practical applications.',
    keyQuestions: [
      'What are Newton\'s laws of motion?',
      'How does energy transform?',
      'What is quantum mechanics?'
    ],
    terms: [
      { id: 't1', term: 'Mechanics' },
      { id: 't2', term: 'Thermodynamics' },
      { id: 't3', term: 'Quantum Physics' }
    ],
    courseContent: [
      {
        id: 'v1',
        type: 'video',
        title: 'Introduction to Physics',
        description: 'Fundamental concepts of physics',
        duration: '17:20',
        imageUrl: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&auto=format&fit=crop&q=60'
      }
    ]
  },
  {
    id: '6',
    name: 'Rachel Green',
    subject: 'English Literature',
    level: 'One Year',
    imageUrl: 'https://lh3.googleusercontent.com/pw/AP1GczOBLtrIKx14F_WUn-BI1k_gZ7iPDE6n2nJ-KxdqwiysmTwGhDaKxNJEfA6v4F7edWOukMYtWkPHScf-Or8cM6aGNtFBr94ACI4iWtCXq_D7hXRFweF7lm32_57P6c50P5uT51ohL5BFwLRSgY31tZmlSA=w1232-h928-s-no-gm?authuser=0',
    description: 'Explore classic and contemporary literature through analysis and discussion. Develop writing and critical analysis skills.',
    lastUpdated: '2025-02-14',
    ageRange: '17-18',
    type: 'Literature Education',
    summary: 'A journey through classic and contemporary literature.',
    keyQuestions: [
      'How do we analyze literary works?',
      'What are the major literary movements?',
      'How do we interpret themes and symbolism?'
    ],
    terms: [
      { id: 't1', term: 'Literary Analysis' },
      { id: 't2', term: 'Writing Skills' },
      { id: 't3', term: 'Critical Reading' }
    ],
    courseContent: [
      {
        id: 'v1',
        type: 'video',
        title: 'Introduction to Literature',
        description: 'Understanding literary analysis',
        duration: '16:15',
        imageUrl: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=60'
      }
    ]
  }
];