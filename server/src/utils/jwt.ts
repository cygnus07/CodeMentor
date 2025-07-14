import jwt from 'jsonwebtoken';
import { config } from '@/config/environment';
import { Types } from 'mongoose';

export interface TokenPayload {
  userId: string;
  email: string;
}

export interface RefreshTokenPayload extends TokenPayload {
  tokenType: 'refresh';
}

export const generateTokens = (userId: Types.ObjectId, email: string) => {
  if (!config.JWT_SECRET || !config.JWT_REFRESH_SECRET) {
    throw new Error('JWT secrets are not configured');
  }

  const payload: TokenPayload = {
    userId: userId.toString(),
    email,
  };

 const accessToken = jwt.sign(payload, config.JWT_SECRET, {
  expiresIn: config.JWT_EXPIRES_IN as any,
});

  const refreshPayload: RefreshTokenPayload = {
    ...payload,
    tokenType: 'refresh',
  };

  const refreshToken = jwt.sign(refreshPayload, config.JWT_REFRESH_SECRET, {
  expiresIn: config.JWT_REFRESH_EXPIRES_IN as any,
});

  return { accessToken, refreshToken };
};

export const verifyAccessToken = (token: string): TokenPayload => {
  if (!config.JWT_SECRET) {
    throw new Error('JWT_SECRET is not configured');
  }
  return jwt.verify(token, config.JWT_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  if (!config.JWT_REFRESH_SECRET) {
    throw new Error('JWT_REFRESH_SECRET is not configured');
  }
  
  const payload = jwt.verify(token, config.JWT_REFRESH_SECRET) as RefreshTokenPayload;
  
  if (payload.tokenType !== 'refresh') {
    throw new Error('Invalid token type');
  }
  
  return payload;
};