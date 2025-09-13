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

export const mockVideos: Video[] = [
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
  }
];