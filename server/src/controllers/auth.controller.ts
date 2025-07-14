import { Request, Response } from 'express';
import { authService } from '@/services/auth.service';
import { signupSchema, loginSchema } from '@/utils/validation';
import { asyncHandler } from '@/middleware/errorHandler';
import { TokenPayload } from '@/utils/jwt';

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = signupSchema.parse(req.body);
  const result = await authService.signup(validatedData);

  res.status(201).json({
    success: true,
    data: result,
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const validatedData = loginSchema.parse(req.body);
  const result = await authService.login(validatedData);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(400).json({
      success: false,
      error: 'Refresh token is required',
    });
    return;
  }

  const tokens = await authService.refreshToken(refreshToken);

  res.status(200).json({
    success: true,
    data: tokens,
  });
});

export const getProfile = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.user);
const user = await authService.getProfile((req.user as TokenPayload).userId);

  res.status(200).json({
    success: true,
    data: user,
  });
});