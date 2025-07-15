import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { chatApi } from '@/lib/api/chat';
import { Message } from '@/types';
import { toast } from 'sonner';

export function useChats() {
  const queryClient = useQueryClient();

  const { data: chats = [], isLoading } = useQuery({
    queryKey: ['chats'],
    queryFn: chatApi.getUserChats,
  });

  const createChatMutation = useMutation({
    mutationFn: chatApi.createChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error?.message || 'Failed to create chat');
    },
  });

  const deleteChatMutation = useMutation({
    mutationFn: chatApi.deleteChat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      toast.success('Chat deleted');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error?.message || 'Failed to delete chat');
    },
  });

  return {
    chats,
    isLoading,
    createChat: createChatMutation.mutate,
    deleteChat: deleteChatMutation.mutate,
    isCreating: createChatMutation.isPending,
  };
}

export function useChatMessages(chatId: string | null) {
  const queryClient = useQueryClient();
  const [optimisticMessages, setOptimisticMessages] = useState<Message[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => chatId ? chatApi.getChatMessages(chatId) : null,
    enabled: !!chatId,
  });

  const sendMessageMutation = useMutation({
    mutationFn: ({ chatId, message }: { chatId: string; message: string }) =>
      chatApi.sendMessage(chatId, message),
    onMutate: async ({ message }) => {
      // Add optimistic user message
      const tempUserMessage: Message = {
        _id: `temp-${Date.now()}`,
        chatId: chatId!,
        role: 'user',
        content: message,
        createdAt: new Date().toISOString(),
      };
      setOptimisticMessages(prev => [...prev, tempUserMessage]);
    },
    onSuccess: (data) => {
      // Clear optimistic messages and update cache
      setOptimisticMessages([]);
      queryClient.invalidateQueries({ queryKey: ['chat', chatId] });
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
    onError: (error: any) => {
      // Remove optimistic messages on error
      setOptimisticMessages([]);
      toast.error(error.response?.data?.error?.message || 'Failed to send message');
    },
  });

  const messages = [...(data?.messages || []), ...optimisticMessages];

  return {
    chat: data?.chat,
    messages,
    isLoading,
    sendMessage: sendMessageMutation.mutate,
    isSending: sendMessageMutation.isPending,
  };
}