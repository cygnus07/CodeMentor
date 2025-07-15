import apiClient from './client';
import { Chat, Message, ApiResponse } from '@/types';

export const chatApi = {
  createChat: async (message: string): Promise<{ chat: Chat; messages: Message[] }> => {
    const response = await apiClient.post<ApiResponse<{ chat: Chat; messages: Message[] }>>('/chats', {
      message,
    });
    return response.data.data!;
  },

  getUserChats: async (): Promise<Chat[]> => {
    const response = await apiClient.get<ApiResponse<Chat[]>>('/chats');
    return response.data.data!;
  },

  getChatMessages: async (chatId: string): Promise<{ chat: Chat; messages: Message[] }> => {
    const response = await apiClient.get<ApiResponse<{ chat: Chat; messages: Message[] }>>(`/chats/${chatId}`);
    return response.data.data!;
  },

  sendMessage: async (chatId: string, message: string): Promise<{ userMessage: Message; assistantMessage: Message }> => {
    const response = await apiClient.post<ApiResponse<{ userMessage: Message; assistantMessage: Message }>>(`/chats/${chatId}/messages`, {
      message,
    });
    return response.data.data!;
  },

  updateChatTitle: async (chatId: string, title: string): Promise<Chat> => {
    const response = await apiClient.patch<ApiResponse<Chat>>(`/chats/${chatId}`, {
      title,
    });
    return response.data.data!;
  },

  deleteChat: async (chatId: string): Promise<void> => {
    await apiClient.delete(`/chats/${chatId}`);
  },
};