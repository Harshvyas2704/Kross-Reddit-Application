import { create } from 'zustand';

interface AuthState {
  user: { id: string; email: string } | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  setAuth: (
    user: { id: string; email: string },
    accessToken: string,
    refreshToken: string,
  ) => void;
  clearAuth: () => void;
  updateToken: (newToken: string) => void;
}

export const useAuthStore = create<AuthState>(set => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  setAuth: (user, accessToken, refreshToken) =>
    set({ user, accessToken, refreshToken }),
  clearAuth: () => set({ user: null, accessToken: null, refreshToken: null }),
  updateToken: accessToken => set({ accessToken }),
}));
