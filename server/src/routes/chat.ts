import { Router } from 'express';
import * as chatController from '@/controllers/chat.controller';
import { authenticate } from '@/middleware/auth';

const router = Router();

router.use(authenticate);

router.post('/', chatController.createChat);
router.get('/', chatController.getUserChats);
router.get('/:chatId', chatController.getChatMessages);
router.post('/:chatId/messages', chatController.sendMessage);
router.patch('/:chatId', chatController.updateChatTitle);
router.delete('/:chatId', chatController.deleteChat);

export default router;