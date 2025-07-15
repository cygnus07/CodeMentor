import apiClient from './client';
import { AuthResponse, User, ApiResponse } from '@/types';
import { SignupInput, LoginInput } from '@/lib/validations';

export const authApi = {
  signup: async (data: SignupInput): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/signup', data);
    return response.data.data!;
  },

  login: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data);
    return response.data.data!;
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<ApiResponse<User>>('/auth/profile');
    return response.data.data!;
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  },
};