"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, Trash2, Menu, X, Edit2, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { Chat } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { chatApi } from '@/lib/api/chat';
import { toast } from 'sonner';

interface ChatSidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  onSelectChat: (chatId: string) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
  isCreating: boolean;
}

export function ChatSidebar({
  chats,
  currentChatId,
  onSelectChat,
  onNewChat,
  onDeleteChat,
  isCreating,
}: ChatSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const queryClient = useQueryClient();

  // Persist collapsed state
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) setIsCollapsed(JSON.parse(savedState));
  }, []);

  const updateTitleMutation = useMutation({
    mutationFn: ({ chatId, title }: { chatId: string; title: string }) =>
      chatApi.updateChatTitle(chatId, title),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      setEditingChatId(null);
      toast.success('Chat title updated');
    },
    onError: () => {
      toast.error('Failed to update chat title');
    },
  });

  const handleEditTitle = (chat: Chat) => {
    setEditingChatId(chat._id);
    setEditTitle(chat.title);
  };

  const handleSaveTitle = (chatId: string) => {
    if (editTitle.trim()) {
      updateTitleMutation.mutate({ chatId, title: editTitle.trim() });
    }
  };

  const toggleCollapse = () => {
    const newState = !isCollapsed;
    setIsCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    return d.toLocaleDateString();
  };

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-20 left-4 z-40"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Desktop Toggle Button - Now positioned independently */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "hidden md:flex fixed top-1/2 -translate-y-1/2 z-40",
          "h-8 w-8 rounded-l-none border-l-0 transition-all duration-200",
          isCollapsed ? "left-0" : "left-80"
        )}
        onClick={toggleCollapse}
      >
        {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ 
            x: window.innerWidth >= 768 ? 0 : -300,
            width: window.innerWidth >= 768 ? (isCollapsed ? '0' : '20rem') : '20rem'
          }}
          animate={{ 
            x: isOpen ? 0 : (window.innerWidth >= 768 ? 0 : -300),
            width: window.innerWidth >= 768 ? (isCollapsed ? '0' : '20rem') : '20rem'
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 100 }}
          className={cn(
            "fixed md:relative top-0 left-0 h-[calc(100vh-5rem)] bg-background border-r z-30",
            "md:block",
            isCollapsed ? 'overflow-hidden' : 'overflow-y-auto'
          )}
        >
          <div className={cn(
            "flex flex-col h-full pt-20 md:pt-0 transition-all duration-200",
            isCollapsed ? 'opacity-0' : 'opacity-100'
          )}>
            <div className="p-4">
              <Button
                variant="gradient"
                className="w-full"
                onClick={() => {
                  onNewChat();
                  setIsOpen(false);
                }}
                disabled={isCreating}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Chat
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <div className="space-y-2">
                {chats.map((chat) => (
                  <div
                    key={chat._id}
                    className={cn(
                      "group relative rounded-lg p-3 hover:bg-secondary/50 cursor-pointer transition-colors",
                      currentChatId === chat._id && "bg-secondary"
                    )}
                  >
                    {editingChatId === chat._id ? (
                      <div className="flex items-center gap-2">
                        <Input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleSaveTitle(chat._id);
                            }
                          }}
                          className="h-8"
                          autoFocus
                        />
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8"
                          onClick={() => handleSaveTitle(chat._id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        onClick={() => {
                          onSelectChat(chat._id);
                          setIsOpen(false);
                        }}
                      >
                        <div className="flex items-start gap-3">
                          <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">
                              {chat.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatDate(chat.lastMessageAt || chat.createdAt)}
                            </p>
                          </div>
                        </div>
                        <div className="absolute right-2 top-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditTitle(chat);
                            }}
                          >
                            <Edit2 className="h-3 w-3" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-7 w-7 hover:text-destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteChat(chat._id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {chats.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-sm text-muted-foreground">
                      No chats yet. Start a new conversation!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.aside>
      </AnimatePresence>

      {/* Mobile Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}