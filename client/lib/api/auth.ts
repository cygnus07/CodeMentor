import apiClient from './client';
import { AuthResponse, User, ApiResponse } from '@/types';
import { SignupInput, LoginInput } from '@/lib/validations';
import { AxiosError } from 'axios';

export const authApi = {
  signup: async (data: SignupInput): Promise<AuthResponse> => {
    try {
      console.log('🚀 Making signup request to:', `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`);
      console.log('📤 Request data:', data);
      
      const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/signup', data);
      
      console.log('✅ Raw response:', response);
      console.log('✅ Response data:', response.data);
      console.log('✅ Response status:', response.status);
      
      if (!response.data.success) {
        throw new Error(response.data.error?.message || 'Signup failed');
      }
      
      if (!response.data.data) {
        throw new Error('No data received from server');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('❌ Signup error details:', error);
      
      if (error instanceof AxiosError) {
        console.error('❌ Axios error response:', error.response);
        console.error('❌ Axios error data:', error.response?.data);
        console.error('❌ Axios error status:', error.response?.status);
        console.error('❌ Axios error message:', error.message);
        
        // Handle different error scenarios
        if (error.response) {
          // Server responded with error status
          const serverError = error.response.data?.error?.message || 
                             error.response.data?.message || 
                             `Server error: ${error.response.status}`;
          throw new Error(serverError);
        } else if (error.request) {
          // Network error - no response received
          console.error('❌ Network error - no response:', error.request);
          throw new Error('Network error: Unable to connect to server. Please check if the backend is running.');
        } else {
          // Request setup error
          throw new Error(`Request error: ${error.message}`);
        }
      }
      
      // Re-throw if it's already a custom error
      throw error;
    }
  },

  login: async (data: LoginInput): Promise<AuthResponse> => {
    try {
      console.log('🚀 Making login request to:', `${process.env.NEXT_PUBLIC_API_URL}/auth/login`);
      
      const response = await apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data);
      
      console.log('✅ Login response:', response.data);
      
      if (!response.data.success) {
        throw new Error(response.data.error?.message || 'Login failed');
      }
      
      if (!response.data.data) {
        throw new Error('No data received from server');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('❌ Login error:', error);
      
      if (error instanceof AxiosError) {
        if (error.response) {
          const serverError = error.response.data?.error?.message || 
                             error.response.data?.message || 
                             `Server error: ${error.response.status}`;
          throw new Error(serverError);
        } else if (error.request) {
          throw new Error('Network error: Unable to connect to server');
        }
      }
      
      throw error;
    }
  },

  getProfile: async (): Promise<User> => {
    try {
      const response = await apiClient.get<ApiResponse<User>>('/auth/profile');
      
      if (!response.data.success) {
        throw new Error(response.data.error?.message || 'Failed to get profile');
      }
      
      if (!response.data.data) {
        throw new Error('No profile data received from server');
      }
      
      return response.data.data;
    } catch (error) {
      console.error('❌ Get profile error:', error);
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
  },
};