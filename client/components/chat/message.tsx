"use client"

import { motion } from 'framer-motion';
import { User, Bot, Copy, Check } from 'lucide-react';
import { Message } from '@/types';
import { CodeBlock } from '@/components/ui/code-block';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface MessageComponentProps {
  message: Message;
  isOptimistic?: boolean;
}

export function MessageComponent({ message, isOptimistic = false }: MessageComponentProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Parse message content for code blocks
  const parseContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const lines = part.split('\n');
        const language = lines[0].replace('```', '').trim();
        const code = lines.slice(1, -1).join('\n');
        return <CodeBlock key={index} code={code} language={language} />;
      }
      return (
        <div key={index} className="whitespace-pre-wrap">
          {part}
        </div>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isOptimistic ? 0.6 : 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "flex gap-3 p-4 rounded-lg",
        isUser ? "bg-primary/10" : "bg-secondary/50"
      )}
    >
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        isUser ? "bg-primary text-primary-foreground" : "bg-gradient-to-br from-blue-500 to-purple-600 text-white"
      )}>
        {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      
      <div className="flex-1 space-y-2">
        <div className="flex items-start justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {isUser ? 'You' : 'CodeMentor'}
          </span>
          {!isOptimistic && (
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 opacity-0 hover:opacity-100 transition-opacity"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
            </Button>
          )}
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          {parseContent(message.content)}
        </div>
        {message.tokens && (
          <span className="text-xs text-muted-foreground">
            {message.tokens} tokens
          </span>
        )}
      </div>
    </motion.div>
  );
}