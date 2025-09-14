export interface Video {
  id: string;
  title: string;
  author: string;
  category: string;
  thumbnail: string;
  duration: string;
  quiz: {
    question: string;
    options: string[];
    correct: number;
  };
  summary: string;
  practicalExample: string;
}

// Generate additional videos to ensure each category has at least 5 videos
const generateAdditionalVideos = (baseVideos: Video[]): Video[] => {
  const categories = Array.from(new Set(baseVideos.map(v => v.category)));
  const videosByCategory: Record<string, Video[]> = {};
  
  // Group videos by category
  baseVideos.forEach(video => {
    if (!videosByCategory[video.category]) {
      videosByCategory[video.category] = [];
    }
    videosByCategory[video.category].push(video);
  });
  
  // Ensure each category has at least 5 videos
  const result = [...baseVideos];
  let idCounter = 10;
  
  categories.forEach(category => {
    const categoryVideos = videosByCategory[category] || [];
    while (categoryVideos.length < 5) {
      // Duplicate existing videos with new IDs
      const baseVideo = categoryVideos[categoryVideos.length % categoryVideos.length];
      const newVideo: Video = {
        ...baseVideo,
        id: `${idCounter++}`,
        title: `${baseVideo.title} - Part ${categoryVideos.length + 1}`
      };
      categoryVideos.push(newVideo);
      result.push(newVideo);
    }
  });
  
  return result;
};

const baseVideos: Video[] = [
  {
    id: "1",
    title: "React Hooks Fundamentals",
    author: "Sarah Chen",
    category: "programming",
    thumbnail: "/placeholder.svg",
    duration: "8:42",
    quiz: {
      question: "Which hook is used to manage component state in React?",
      options: ["useEffect", "useState", "useContext", "useCallback"],
      correct: 1
    },
    summary: "Learn the basics of React Hooks including useState, useEffect, and custom hooks. Understand how hooks revolutionized React development by allowing state management in functional components.",
    practicalExample: "Build a simple counter app using useState hook:\n\nconst Counter = () => {\n  const [count, setCount] = useState(0);\n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(count + 1)}>+</button>\n    </div>\n  );\n};"
  },
  {
    id: "2",
    title: "Perfect Pasta Carbonara",
    author: "Chef Marco",
    category: "cooking",
    thumbnail: "/placeholder.svg",
    duration: "12:15",
    quiz: {
      question: "What's the key to preventing scrambled eggs in carbonara?",
      options: ["High heat", "Cold pasta", "Tempered eggs", "Extra cream"],
      correct: 2
    },
    summary: "Master the authentic Italian carbonara with just 5 ingredients: pasta, eggs, pecorino cheese, guanciale, and black pepper. Learn the traditional Roman technique.",
    practicalExample: "Step-by-step carbonara:\n1. Cook guanciale until crispy\n2. Beat eggs with pecorino and pepper\n3. Cook pasta al dente\n4. Mix hot pasta with guanciale fat\n5. Add tempered egg mixture off heat\n6. Toss until creamy"
  },
  {
    id: "3",
    title: "Stoic Philosophy in Daily Life",
    author: "Dr. Elena Vasquez",
    category: "philosophy",
    thumbnail: "/placeholder.svg",
    duration: "15:33",
    quiz: {
      question: "According to Stoicism, what should we focus on?",
      options: ["External events", "What we can control", "Others' opinions", "Material wealth"],
      correct: 1
    },
    summary: "Explore how ancient Stoic principles can help navigate modern challenges. Learn about the dichotomy of control and practical exercises for emotional resilience.",
    practicalExample: "Morning reflection exercise:\n1. Identify today's challenges\n2. Separate what you can/cannot control\n3. Focus energy only on controllable elements\n4. Accept the rest with equanimity\n5. Practice gratitude for what you have"
  },
  {
    id: "4",
    title: "Jazz Chord Progressions",
    author: "Miles Rodriguez",
    category: "music",
    thumbnail: "/placeholder.svg",
    duration: "10:28",
    quiz: {
      question: "What chord progression is most common in jazz standards?",
      options: ["I-V-vi-IV", "ii-V-I", "vi-IV-I-V", "I-vi-ii-V"],
      correct: 1
    },
    summary: "Understand the ii-V-I progression, the backbone of jazz harmony. Learn voice leading, chord substitutions, and how to practice these progressions effectively.",
    practicalExample: "Practice ii-V-I in C major:\nDm7 (D-F-A-C) → G7 (G-B-D-F) → Cmaj7 (C-E-G-B)\n\nTry this progression:\n- Play each chord for 2 beats\n- Focus on smooth voice leading\n- Practice in all 12 keys\n- Add extensions (9ths, 11ths, 13ths)"
  },
  {
    id: "5",
    title: "Color Theory Essentials",
    author: "Aria Kim",
    category: "art",
    thumbnail: "/placeholder.svg",
    duration: "9:17",
    quiz: {
      question: "Which colors are considered complementary to blue?",
      options: ["Red and green", "Orange and yellow", "Orange", "Purple and green"],
      correct: 2
    },
    summary: "Master the fundamentals of color theory including the color wheel, complementary colors, and color harmony. Learn how to create mood and depth through color choices.",
    practicalExample: "Create a color palette:\n1. Choose a dominant color (60%)\n2. Select a secondary color (30%)\n3. Add an accent color (10%)\n4. Test combinations for contrast\n5. Consider color temperature and mood\n6. Apply the 60-30-10 rule in your designs"
  },
  // New videos for additional categories
  {
    id: "6",
    title: "Shakespeare's Greatest Works",
    author: "Prof. James Morrison",
    category: "literature",
    thumbnail: "/placeholder.svg",
    duration: "18:45",
    quiz: {
      question: "Which play features the character Hamlet?",
      options: ["Macbeth", "King Lear", "Hamlet", "Othello"],
      correct: 2
    },
    summary: "Explore the genius of William Shakespeare through his most celebrated works. Understand the themes, characters, and literary techniques that have made his plays timeless.",
    practicalExample: "Analyze a soliloquy:\n1. Read the text carefully\n2. Identify the main themes\n3. Note literary devices (metaphors, imagery)\n4. Consider the character's motivation\n5. Examine the language for emotional impact\n6. Connect to universal human experiences"
  },
  {
    id: "7",
    title: "Woodworking Basics: Build a Table",
    author: "Tom Carpenter",
    category: "diy",
    thumbnail: "/placeholder.svg",
    duration: "25:30",
    quiz: {
      question: "What's the first step in any woodworking project?",
      options: ["Cut the wood", "Sand the surface", "Plan and measure", "Apply finish"],
      correct: 2
    },
    summary: "Learn essential woodworking skills by building your first table. From selecting materials to finishing techniques, master the fundamentals of this rewarding craft.",
    practicalExample: "Project planning:\n1. Sketch your design\n2. List required materials\n3. Calculate dimensions\n4. Prepare tools and workspace\n5. Follow safety procedures\n6. Work systematically from start to finish"
  },
  {
    id: "8",
    title: "Game Design Fundamentals",
    author: "Alex Chen",
    category: "gaming",
    thumbnail: "/placeholder.svg",
    duration: "14:22",
    quiz: {
      question: "What is the core loop in game design?",
      options: ["Graphics rendering", "Player action → system response → feedback", "Loading screens", "Menu navigation"],
      correct: 1
    },
    summary: "Discover the principles of engaging game design. Learn about core loops, player motivation, and how to create compelling gameplay experiences.",
    practicalExample: "Design a core loop:\n1. Define player actions\n2. Determine system responses\n3. Provide meaningful feedback\n4. Create progression systems\n5. Test for engagement\n6. Iterate based on player experience"
  },
  {
    id: "9",
    title: "Time Management Mastery",
    author: "Lisa Rodriguez",
    category: "productivity",
    thumbnail: "/placeholder.svg",
    duration: "11:55",
    quiz: {
      question: "What does the Eisenhower Matrix help with?",
      options: ["Task prioritization", "Financial planning", "Exercise routines", "Diet management"],
      correct: 0
    },
    summary: "Transform your productivity with proven time management techniques. Learn to prioritize effectively, eliminate distractions, and achieve more in less time.",
    practicalExample: "Apply the 2-minute rule:\n1. Identify small tasks\n2. If it takes less than 2 minutes, do it now\n3. Otherwise, schedule or delegate\n4. Use time-blocking for focused work\n5. Take regular breaks\n6. Review and adjust your system"
  }
];

export const mockVideos: Video[] = generateAdditionalVideos(baseVideos);