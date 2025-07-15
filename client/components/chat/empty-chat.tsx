"use client"

import { motion } from 'framer-motion';
import { Code, Bug, Lightbulb, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

const suggestions = [
  {
    icon: Code,
    title: "Write Code",
    description: "Help me write a React component",
    prompt: "Can you help me create a React component for a todo list with TypeScript?",
  },
  {
    icon: Bug,
    title: "Debug Code",
    description: "Fix errors in my code",
    prompt: "I'm getting a 'Cannot read property of undefined' error in my JavaScript code. How can I fix it?",
  },
  {
    icon: Lightbulb,
    title: "Best Practices",
    description: "Learn coding best practices",
    prompt: "What are the best practices for writing clean and maintainable code in Python?",
  },
  {
    icon: Zap,
    title: "Optimize Performance",
    description: "Improve code performance",
    prompt: "How can I optimize the performance of my React application?",
  },
];

interface EmptyChatProps {
  onSelectPrompt: (prompt: string) => void;
}

export function EmptyChat({ onSelectPrompt }: EmptyChatProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold mb-2">Welcome to CodeMentor</h2>
        <p className="text-muted-foreground">
          Your AI-powered coding assistant. How can I help you today?
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {suggestions.map((suggestion, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card
              className="p-4 cursor-pointer hover:shadow-lg transition-all hover:scale-105 group"
              onClick={() => onSelectPrompt(suggestion.prompt)}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-white group-hover:scale-110 transition-transform">
                  <suggestion.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{suggestion.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {suggestion.description}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}