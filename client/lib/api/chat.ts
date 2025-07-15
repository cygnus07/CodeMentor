import apiClient from './client';
import { Chat, Message, ApiResponse } from '@/types';
import { AxiosError } from 'axios';

export const chatApi = {
  createChat: async (message: string): Promise<{ chat: Chat; messages: Message[] }> => {
    try {
      const response = await apiClient.post<ApiResponse<{ chat: Chat; messages: Message[] }>>('/chats', {
        message,
      });
      
      if (!response.data.success) {
        throw new Error(response.data.error?.message || 'Failed to create chat');
      }
      
      return response.data.data!;
    } catch (error) {
      console.error('❌ Create chat error:', error);
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.error?.message || 'Failed to create chat');
      }
      throw error;
    }
  },

  getUserChats: async (): Promise<Chat[]> => {
    try {
      const response = await apiClient.get<ApiResponse<Chat[]>>('/chats');
      
      if (!response.data.success) {
        throw new Error(response.data.error?.message || 'Failed to fetch chats');
      }
      
      return response.data.data!;
    } catch (error) {
      console.error('❌ Get user chats error:', error);
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.error?.message || 'Failed to fetch chats');
      }
      throw error;
    }
  },

  getChatMessages: async (chatId: string): Promise<{ chat: Chat; messages: Message[] }> => {
    try {
      const response = await apiClient.get<ApiResponse<{ chat: Chat; messages: Message[] }>>(`/chats/${chatId}`);
      
      if (!response.data.success) {
        throw new Error(response.data.error?.message || 'Failed to fetch chat messages');
      }
      
      return response.data.data!;
    } catch (error) {
      console.error('❌ Get chat messages error:', error);
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.error?.message || 'Failed to fetch chat messages');
      }
      throw error;
    }
  },

  sendMessage: async (chatId: string, message: string): Promise<{ userMessage: Message; assistantMessage: Message }> => {
    try {
      const response = await apiClient.post<ApiResponse<{ userMessage: Message; assistantMessage: Message }>>(`/chats/${chatId}/messages`, {
        message,
      });
      
      if (!response.data.success) {
        throw new Error(response.data.error?.message || 'Failed to send message');
      }
      
      return response.data.data!;
    } catch (error) {
      console.error('❌ Send message error:', error);
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.error?.message || 'Failed to send message');
      }
      throw error;
    }
  },

  updateChatTitle: async (chatId: string, title: string): Promise<Chat> => {
    try {
      const response = await apiClient.patch<ApiResponse<Chat>>(`/chats/${chatId}`, {
        title,
      });
      
      if (!response.data.success) {
        throw new Error(response.data.error?.message || 'Failed to update chat title');
      }
      
      return response.data.data!;
    } catch (error) {
      console.error('❌ Update chat title error:', error);
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.error?.message || 'Failed to update chat title');
      }
      throw error;
    }
  },

  deleteChat: async (chatId: string): Promise<void> => {
    try {
      const response = await apiClient.delete<ApiResponse<void>>(`/chats/${chatId}`);
      
      if (!response.data.success) {
        throw new Error(response.data.error?.message || 'Failed to delete chat');
      }
    } catch (error) {
      console.error('❌ Delete chat error:', error);
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data?.error?.message || 'Failed to delete chat');
      }
      throw error;
    }
  },
};