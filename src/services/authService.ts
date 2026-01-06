import api from './api';
import { decodeJWT } from '../utils/jwt';
import { useAuthStore } from '../store/authStore';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResponse {
  status: number;
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
}

export const authService = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await api.post<LoginResponse>(
        '/auth/login',
        credentials,
      );

      if (response.data.success) {
        const { accessToken, refreshToken } = response.data.data;

        // Decode JWT to get user info
        const user = decodeJWT(accessToken);

        if (user) {
          // Save to store (async)
          await useAuthStore.getState().setTokens(accessToken, refreshToken);
          await useAuthStore.getState().setUser(user);

          return {
            success: true,
            message: response.data.message,
            user,
          };
        } else {
          throw new Error('Failed to decode token');
        }
      }

      return {
        success: false,
        message: response.data.message || 'Đăng nhập thất bại',
      };
    } catch (error: any) {
      console.error('Login error:', error);
      return {
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          'Đăng nhập thất bại',
      };
    }
  },

  /**
   * Logout user
   */
  logout: async () => {
    await useAuthStore.getState().logout();
  },

  /**
   * Get current access token
   */
  getAccessToken: () => {
    return useAuthStore.getState().accessToken;
  },

  /**
   * Restore token from AsyncStorage on app start
   */
  restoreToken: async () => {
    await useAuthStore.getState().restoreToken();
  },
};
