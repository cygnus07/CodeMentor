// codementor/server/src/services/openai.service.ts
import OpenAI from 'openai';
import { config } from '@/config/environment';
import { AppError } from '@/middleware/errorHandler';

class OpenAIService {
  private openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: config.OPENAI_API_KEY,
    });
  }

  async getChatCompletion(messages: Array<{ role: string; content: string }>) {
    try {
      const completion = await this.openai.chat.completions.create({
        model: config.OPENAI_MODEL,
        messages: messages as any,
        temperature: 0.7,
        max_tokens: 2000,
      });

      const response = completion.choices[0]?.message?.content;
      const tokens = completion.usage?.total_tokens || 0;

      if (!response) {
        throw new AppError('No response from OpenAI', 500);
      }

      return { response, tokens };
    } catch (error) {
      console.error('OpenAI API error:', error);
      
      if (error instanceof OpenAI.APIError) {
        if (error.status === 429) {
          throw new AppError('Rate limit exceeded. Please try again later.', 429);
        } else if (error.status === 401) {
          throw new AppError('Invalid API key', 401);
        }
      }
      
      throw new AppError('Failed to get AI response', 500);
    }
  }
}

export const openAIService = new OpenAIService();