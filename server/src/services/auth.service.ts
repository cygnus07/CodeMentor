// codementor/server/src/services/auth.service.ts
import { User } from '@/models/user.model';
import { generateTokens, verifyRefreshToken } from '@/utils/jwt';
import { SignupInput, LoginInput } from '@/utils/validation';
import { AppError } from '@/middleware/errorHandler';

class AuthService {
  async signup(data: SignupInput) {
    const existingUser = await User.findOne({ email: data.email });
    
    if (existingUser) {
      throw new AppError('Email already registered', 409);
    }

    const user = await User.create(data);
    const tokens = generateTokens(user._id, user.email);

    return {
      user: user.toJSON(),
      ...tokens,
    };
  }

  async login(data: LoginInput) {
    const user = await User.findOne({ email: data.email }).select('+password');
    
    if (!user || !(await user.comparePassword(data.password))) {
      throw new AppError('Invalid email or password', 401);
    }

    if (!user.isActive) {
      throw new AppError('Account is deactivated', 403);
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    const tokens = generateTokens(user._id, user.email);

    return {
      user: user.toJSON(),
      ...tokens,
    };
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = verifyRefreshToken(refreshToken);
      const user = await User.findById(payload.userId);

      if (!user || !user.isActive) {
        throw new AppError('User not found or inactive', 401);
      }

      const tokens = generateTokens(user._id, user.email);

      return tokens;
    } catch (error) {
      throw new AppError('Invalid refresh token', 401);
    }
  }

  async getProfile(userId: string) {
    const user = await User.findById(userId);
    
    if (!user) {
      throw new AppError('User not found', 404);
    }

    return user.toJSON();
  }
}

export const authService = new AuthService();