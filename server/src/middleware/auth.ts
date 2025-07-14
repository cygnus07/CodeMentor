// codementor/server/src/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '@/utils/jwt';
import { AppError } from './errorHandler';

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new AppError('No token provided', 401);
    }
    
    const parts = authHeader.split(' ');
    if (parts.length !== 2) {
      throw new AppError('Invalid token format', 401);
    }
    
    const token = parts[1];
    if (!token) {
      throw new AppError('No token provided', 401);
    }
    
    const payload = verifyAccessToken(token);
    
    req.user = payload;
    next();
  } catch (error) {
    if (error instanceof Error) {
      if (error.name === 'JsonWebTokenError') {
        next(new AppError('Invalid token', 401));
      } else if (error.name === 'TokenExpiredError') {
        next(new AppError('Token expired', 401));
      } else {
        next(error);
      }
    } else {
      next(new AppError('Authentication failed', 401));
    }
  }
};