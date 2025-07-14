import { Request, Response } from 'express';
import { chatService } from '@/services/chat.service';
import { chatMessageSchema, updateChatSchema } from '@/utils/validation';
import { asyncHandler } from '@/middleware/errorHandler';
import { TokenPayload } from '@/utils/jwt';

export const createChat = asyncHandler(async (req: Request, res: Response) => {
  const { message } = chatMessageSchema.parse(req.body);
  const result = await chatService.createChat((req.user as TokenPayload).userId, message);

  res.status(201).json({
    success: true,
    data: result,
  });
});

export const sendMessage = asyncHandler(async (req: Request, res: Response) => {
  const { message } = chatMessageSchema.parse(req.body);
  const { chatId } = req.params;
  
  const result = await chatService.sendMessage((req.user as TokenPayload).userId, chatId, message);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const getUserChats = asyncHandler(async (req: Request, res: Response) => {
  const chats = await chatService.getUserChats((req.user as TokenPayload).userId);

  res.status(200).json({
    success: true,
    data: chats,
  });
});

export const getChatMessages = asyncHandler(async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const result = await chatService.getChatMessages((req.user as TokenPayload).userId, chatId);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const updateChatTitle = asyncHandler(async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const { title } = updateChatSchema.parse(req.body);
  
  const chat = await chatService.updateChatTitle((req.user as TokenPayload).userId, chatId, title);

  res.status(200).json({
    success: true,
    data: chat,
  });
});

export const deleteChat = asyncHandler(async (req: Request, res: Response) => {
  const { chatId } = req.params;
  const result = await chatService.deleteChat((req.user as TokenPayload).userId, chatId);

  res.status(200).json({
    success: true,
    data: result,
  });
});