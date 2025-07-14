import { Chat, IChat } from '@/models/chat.model';
import { Message, IMessage } from '@/models/message.model';
import { openAIService } from './openai.service';
import { AppError } from '@/middleware/errorHandler';
// import { Types } from 'mongoose';



class ChatService {
  async createChat(userId: string, firstMessage: string) {
    // Create new chat
    const chat = await Chat.create({
      userId,
      title: firstMessage.substring(0, 50) + (firstMessage.length > 50 ? '...' : ''),
    }) as IChat;

    // Save user message
    const userMessage = await Message.create({
      chatId: chat._id,
      role: 'user',
      content: firstMessage,
    }) as IMessage;

    // Get AI response
    const { response, tokens } = await openAIService.getChatCompletion([
      {
        role: 'system',
        content: 'You are CodeMentor, an expert programming assistant. Help users with coding questions, debugging, best practices, and software development concepts.',
      },
      {
        role: 'user',
        content: firstMessage,
      },
    ]);

    // Save AI response
    const assistantMessage = await Message.create({
      chatId: chat._id,
      role: 'assistant',
      content: response,
      tokens,
    });

    // Update chat with messages
    chat.messages.push(userMessage._id, assistantMessage._id);
    chat.lastMessageAt = new Date();
    await chat.save();

    return {
      chat,
      messages: [userMessage, assistantMessage],
    };
  }

  async sendMessage(userId: string, chatId: string, content: string) {
    // Verify chat ownership
    const chat = await Chat.findOne({ _id: chatId, userId });
    
    if (!chat) {
      throw new AppError('Chat not found', 404);
    }

    // Get previous messages for context
    const previousMessages = await Message.find({ chatId })
      .sort('createdAt')
      .limit(20); // Limit context to last 20 messages

    // Save user message
    const userMessage = await Message.create({
      chatId: chat._id,
      role: 'user',
      content,
    });

    // Prepare messages for OpenAI
    const openAIMessages = [
      {
        role: 'system',
        content: 'You are CodeMentor, an expert programming assistant. Help users with coding questions, debugging, best practices, and software development concepts.',
      },
      ...previousMessages.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user',
        content,
      },
    ];

    // Get AI response
    const { response, tokens } = await openAIService.getChatCompletion(openAIMessages);

    // Save AI response
    const assistantMessage = await Message.create({
      chatId: chat._id,
      role: 'assistant',
      content: response,
      tokens,
    });

    // Update chat
    chat.messages.push(userMessage._id, assistantMessage._id);
    chat.lastMessageAt = new Date();
    await chat.save();

    return {
      userMessage,
      assistantMessage,
    };
  }

  async getUserChats(userId: string) {
    const chats = await Chat.find({ userId, isActive: true })
      .sort('-lastMessageAt')
      .populate({
        path: 'messages',
        options: { limit: 1, sort: '-createdAt' },
      });

    return chats;
  }

  async getChatMessages(userId: string, chatId: string) {
    const chat = await Chat.findOne({ _id: chatId, userId });
    
    if (!chat) {
      throw new AppError('Chat not found', 404);
    }

    const messages = await Message.find({ chatId }).sort('createdAt');

    return {
      chat,
      messages,
    };
  }

  async updateChatTitle(userId: string, chatId: string, title: string) {
    const chat = await Chat.findOneAndUpdate(
      { _id: chatId, userId },
      { title },
      { new: true }
    );

    if (!chat) {
      throw new AppError('Chat not found', 404);
    }

    return chat;
  }

  async deleteChat(userId: string, chatId: string) {
    const chat = await Chat.findOne({ _id: chatId, userId });
    
    if (!chat) {
      throw new AppError('Chat not found', 404);
    }

    // Soft delete
    chat.isActive = false;
    await chat.save();

    return { message: 'Chat deleted successfully' };
  }
}

export const chatService = new ChatService();