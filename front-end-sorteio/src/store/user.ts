// Isto deveria ser userStore.ts, não playersStore.ts
import { create } from 'zustand';
import { server } from '@/api/server'
import { toast } from 'react-toastify';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { AxiosError } from 'axios';

type State = {
  token: string | undefined;
  refreshToken: string | undefined;
  isLoading: boolean;
  error: boolean;
};

type Actions = {
  login: (email: string, password: string, router: AppRouterInstance) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, router: AppRouterInstance) => Promise<void>;
};

// Cria o store
export const useUsersStore = create<State & Actions>((set) => ({
  token: '',
  refreshToken: '', 
  isLoading: false,
  error: false,

  login: async (email: string, password: string, router: AppRouterInstance) => {
    set({ isLoading: true, error: false });

    try {
      const response = await server.post('/auth/login', {email, password})
    
      // Armazene o token e o refreshToken no estado e no localStorage para persistência
      set({ 
        token: response.data.accessToken, 
        refreshToken: response.data.refreshToken, 
        isLoading: false 
      });
      
      // Salve no localStorage para manter entre recarregamentos
      localStorage.setItem('userToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      
      router.push('/random-draw')
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      toast('usuário ou senha inválidos', { type:'error' })
      set({ isLoading: false, error: true });
    }
  },

  register: async (email: string, password: string, router: AppRouterInstance) => {
    set({ isLoading: true, error: false});

    try {
      await server.post('/auth/register', {email, password})
      
      set({ isLoading: false });
      toast('usuário cadastrado com sucesso', { type:'success' })
      router.push('/auth/login')    
    } catch (error: AxiosError) {
      toast(error.response.data.message, { type:'error' })
      set({ isLoading: false, error: true });
      throw error;
    }
  },
  logout: () => {
    set({ token: undefined, refreshToken: undefined });
    localStorage.removeItem('userToken');
    localStorage.removeItem('refreshToken');
  },
}));