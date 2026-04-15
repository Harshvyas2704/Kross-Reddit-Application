import axios from 'axios';
import { useAuthStore } from '@store/useAuthStore';

export const apiClient = axios.create({
  baseURL: 'localHost:8777/krossreddit/api/v1', // Change this later
  timeout: 10000,
});

apiClient.interceptors.request.use(config => {
  const token = useAuthStore.getState().accessToken;
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = useAuthStore.getState().refreshToken;
        if (!refreshToken) throw new Error('Refresh token is missing');

        const { data } = await axios.post(
          'localHost:8777/krossreddit/api/v1/refresh',
          {
            token: refreshToken,
          },
        );
        const newAccessToken = data.accessToken;
        useAuthStore.getState().updateToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);
