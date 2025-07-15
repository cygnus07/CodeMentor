"use client"

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

import { ChatSidebar } from '@/components/chat/chat-sidebar';
import { ChatInput } from '@/components/chat/chat-input';
import { MessageComponent } from '@/components/chat/message';
import { EmptyChat } from '@/components/chat/empty-chat';
import { useChats, useChatMessages } from '@/lib/hooks/use-chat';
// import { toast } from 'sonner';

export default function ChatPage() {
  const router = useRouter();
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { chats, isLoading: chatsLoading, createChat, deleteChat, isCreating } = useChats();
  const { messages, sendMessage, isSending } = useChatMessages(currentChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleNewChat = () => {
    setCurrentChatId(null);
  };

  const handleSendMessage = async (message: string) => {
    try {
      if (!currentChatId) {
        // Create new chat
        createChat(message, {
          onSuccess: (data) => {
            setCurrentChatId(data.chat._id);
          },
        });
      } else {
        // Send message to existing chat
        sendMessage({ chatId: currentChatId, message });
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleDeleteChat = (chatId: string) => {
    if (confirm('Are you sure you want to delete this chat?')) {
      deleteChat(chatId);
      if (currentChatId === chatId) {
        setCurrentChatId(null);
      }
    }
  };

  if (chatsLoading) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] -mx-4">
      <ChatSidebar
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={setCurrentChatId}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        isCreating={isCreating}
      />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto px-4">
          {messages.length === 0 ? (
            <EmptyChat onSelectPrompt={handleSendMessage} />
          ) : (
            <div className="max-w-4xl mx-auto py-8 space-y-4">
              {messages.map((message, index) => (
                <MessageComponent
                  key={message._id}
                  message={message}
                  isOptimistic={message._id.startsWith('temp-')}
                />
              ))}
              {isSending && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-muted-foreground p-4"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>CodeMentor is thinking...</span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <div className="max-w-4xl mx-auto">
            <ChatInput
              onSendMessage={handleSendMessage}
              isLoading={isSending || isCreating}
              placeholder={currentChatId ? "Continue the conversation..." : "Start a new conversation..."}
            />
          </div>
        </div>
      </div>
    </div>
  );
}