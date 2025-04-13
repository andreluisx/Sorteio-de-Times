// Isto deveria ser userStore.ts, não playersStore.ts
import { create } from 'zustand';
import { server } from '@/api/server';
import { toast } from 'react-toastify';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { AxiosError } from 'axios';

type State = {
  token: string | undefined;
  user: { id: string; email: string } | null;
  refreshToken: string | undefined;
  isLoading: boolean;
  error: boolean;
  userAuthenticated: boolean;
};

type Actions = {
  login: (
    email: string,
    password: string,
    router: AppRouterInstance
  ) => Promise<void>;
  checkUser: () => Promise<void>;
  logout: () => void;
  register: (
    email: string,
    password: string,
    router: AppRouterInstance
  ) => Promise<void>;
};

// Cria o store
export const useUsersStore = create<State & Actions>((set) => ({
  token: '',
  refreshToken: '',
  isLoading: false,
  error: false,
  userAuthenticated: false,
  user: {id: '', email: ''},

  login: async (email: string, password: string, router: AppRouterInstance) => {
    set({ isLoading: true, error: false });

    try {
      const response = await server.post('/auth/login', { email, password });

      // Salve no localStorage para manter entre recarregamentos
      localStorage.setItem('userToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      // Armazene o token e o refreshToken no estado e no localStorage para persistência
      set({
        token: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        isLoading: false,
      });

      router.push('/random-draw');
    } catch (error) {
      set({ isLoading: false, error: true, userAuthenticated: true });
    }
  },

  register: async (
    email: string,
    password: string,
    router: AppRouterInstance
  ) => {
    set({ isLoading: true, error: false });

    try {
      await server.post('/auth/register', { email, password });

      set({ isLoading: false });
      toast('usuário cadastrado com sucesso', { type: 'success' });
      router.push('/auth/login');
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast(error.response?.data?.message, { type: 'error' });
      }
      set({ isLoading: false, error: true });
      throw error;
    }
  },

  logout: () => {
    set({
      token: undefined,
      refreshToken: undefined,
      userAuthenticated: false,
    });
    localStorage.removeItem('userToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/auth/login';
  },

  checkUser: async () => {
    set({ isLoading: true });
    try {
      const response = await server.get('/auth/me');
      set({user: response?.data});
    } catch (error) {
      set({user: null});
    }finally{
      set({isLoading: false});
    }
  },
}));
