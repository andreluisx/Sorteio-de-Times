// Isto deveria ser userStore.ts, não playersStore.ts
import { create } from 'zustand';
import { server } from '@/api/server';
import { toast } from 'react-toastify';
import Player from '@/types/playerType';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export interface MatchType {
  createdAt: string;
  id: number;
  matchTime: number;
  team1: Player[];
  team2: Player[];
  winner: number;
}

interface WinnerType {
  createdAt: string;
  id: number;
  matchTime: number;
  teamPlayers: Player[];
  winner: number;
  userId: string;
}

type State = {
  isLoading: boolean;
  pathName: string;
  match: MatchType;
  winnerTeam: WinnerType;
  allMatchs: MatchType[];
};

type Actions = {
  createRandomMatch: (players: Player[]) => Promise<void>;
  createStarMatch: (players: Player[]) => Promise<void>;
  createWinRateMatch: (players: Player[]) => Promise<void>;
  deleteMatch: (id: number) => Promise<void>;
  getMatch: (id: number) => Promise<void>;
  getAllMatchs: () => Promise<void>;
  setWinner: (
    id: number,
    winner: number,
    router: AppRouterInstance
  ) => Promise<void>;
};

// Cria o store
export const useMatchsStore = create<State & Actions>((set) => ({
  match: {
    createdAt: '',
    id: 0,
    matchTime: 0,
    team1: [],
    team2: [],
    time1: [],
    time2: [],
    winner: 0,
  },
  winnerTeam: {
    createdAt: '',
    id: 0,
    matchTime: 0,
    teamPlayers: [],
    winner: 0,
    userId: '',
  },
  allMatchs: [],
  isLoading: false,

  getMatch: async (id: number) => {
    try {
      set({ isLoading: true });
      const token = localStorage.getItem('userToken');

      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const response = await server.get(`/match/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ match: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw new Error('erro ao encontrar partida');
    }
  },

  createRandomMatch: async (players: Player[], router: AppRouterInstance) => {
    try {
      set({ isLoading: true });
      const token = localStorage.getItem('userToken');

      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const playersId = players.map((player) => player.id);

      const response = await server.post(
        '/match/random',
        { players: playersId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      set({ match: response.data });
      console.log(response.data);

      router.push(`/matchs/${response.data.id}`);

      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },

  createStarMatch: async (players: Player[], router: AppRouterInstance) => {
    try {
      set({ isLoading: true });
      const token = localStorage.getItem('userToken');

      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const playersId = players.map((player) => player.id);

      const response = await server.post(
        '/match/star',
        { players: playersId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      set({ match: response.data });
      console.log(response.data);

      router.push(`/matchs/${response.data.id}`);

      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },

  createWinRateMatch: async (players: Player[], router: AppRouterInstance) => {
    try {
      set({ isLoading: true });
      const token = localStorage.getItem('userToken');

      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const playersId = players.map((player) => player.id);

      const response = await server.post(
        '/match/winrate',
        { players: playersId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      set({ match: response.data });
      console.log(response.data);

      router.push(`/matchs/${response.data.id}`);

      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },

  setWinner: async (id: number, winner: number, router: AppRouterInstance) => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem('userToken');

      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const response = await server.patch(
        `/match/${id}`,
        { winner },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      set({ winnerTeam: response.data, isLoading: false });

      router.push('/random-draw/result/winner');
    } catch (e) {
      console.log(e);
      set({ isLoading: false });
    }
  },

  deleteMatch: async (id: number) => {
    set({ isLoading: true });
    try {
      const token = localStorage.getItem('userToken');

      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      server.delete(`/match/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ isLoading: false });

      toast('Partida deletada', { type: 'success' });
    } catch (error) {
      toast('Ocorreu um problema ao deletar a partida', { type: 'error' });
      set({ isLoading: false });
    }
  },

  getAllMatchs: async () => {
    try {
      set({ isLoading: true });
      const token = localStorage.getItem('userToken');

      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const response = await server.get('/match', {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ allMatchs: response.data, isLoading: false });
      console.log(response.data);
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },
}));
