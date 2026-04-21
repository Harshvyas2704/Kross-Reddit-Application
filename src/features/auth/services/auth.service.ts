import { apiClient } from '@core/apiClient';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
  };
  accessToken: string;
  refreshToken: string;
}

export const loginUser = async (
  payload: LoginPayload,
): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post<AuthResponse>('auth/login', payload);
    return response?.data;
  } catch (error) {
    console.log('[API FAILURE]:', error);
    throw error;
  }
};
