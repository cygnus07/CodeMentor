import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(1, 'Name is required').max(50, 'Name too long'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const chatMessageSchema = z.object({
  message: z.string().min(1, 'Message cannot be empty').max(10000, 'Message too long'),
  chatId: z.string().optional(),
});

export const updateChatSchema = z.object({
  title: z.string().min(1, 'Title cannot be empty').max(100, 'Title too long'),
});

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ChatMessageInput = z.infer<typeof chatMessageSchema>;
export type UpdateChatInput = z.infer<typeof updateChatSchema>;