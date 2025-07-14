import { Router } from 'express';
import * as authController from '@/controllers/auth.controller';
import { authenticate } from '@/middleware/auth';

const router = Router();

// Public routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/refresh', authController.refreshToken);

// Protected routes
router.get('/profile', authenticate, authController.getProfile);

export default router;