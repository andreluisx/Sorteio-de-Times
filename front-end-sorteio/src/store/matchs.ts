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
  createManualMatch: (team1: Player[], team2: Player[], router: AppRouterInstance) => Promise<void>;
  createRandomMatch: (players: Player[], router: AppRouterInstance) => Promise<void>;
  createStarMatch: (players: Player[], router: AppRouterInstance) => Promise<void>;
  createWinRateMatch: (players: Player[], router: AppRouterInstance) => Promise<void>;
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
  pathName: '',

  getMatch: async (id: number) => {
    try {
      set({ isLoading: true });
      
      const response = await server.get(`/match/${id}`);

      set({ match: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      throw new Error('erro ao encontrar partida');
    }
  },

  createRandomMatch: async (players: Player[], router: AppRouterInstance) => {
    try {
      set({ isLoading: true });
      
      const playersId = players.map((player) => player.id);

      const response = await server.post(
        '/match/random',
        { players: playersId }
      );

      set({ match: response.data });

      router.push(`/matchs/${response.data.id}`);

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast('Erro ao criar partida aleatória', { type: 'error' });
    }
  },

  createStarMatch: async (players: Player[], router: AppRouterInstance) => {
    try {
      set({ isLoading: true });
      
      const playersId = players.map((player) => player.id);

      const response = await server.post(
        '/match/star',
        { players: playersId }
      );

      set({ match: response.data });

      router.push(`/matchs/${response.data.id}`);

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast('Erro ao criar partida por estrelas', { type: 'error' });
    }
  },

  createWinRateMatch: async (players: Player[], router: AppRouterInstance) => {
    try {
      set({ isLoading: true });
      
      const playersId = players.map((player) => player.id);

      const response = await server.post(
        '/match/winrate',
        { players: playersId }
      );

      set({ match: response.data });

      router.push(`/matchs/${response.data.id}`);

      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast('Erro ao criar partida por taxa de vitória', { type: 'error' });
    }
  },

  setWinner: async (id: number, winner: number, router: AppRouterInstance) => {
    set({ isLoading: true });
    try {
      
      const response = await server.patch(
        `/match/${id}`,
        { winner }
      );

      set({ winnerTeam: response.data});

      router.push('/random-draw/result/winner');
    } catch (error) {
      toast('Erro ao definir vencedor', { type: 'error' });
    } finally {
      set({isLoading: true})
    }
  },

  deleteMatch: async (id: number) => {
    set({ isLoading: true });
    try {
      
      await server.delete(`/match/${id}`);

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
      
      const response = await server.get('/match');

      set({ allMatchs: response.data, isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast('Erro ao buscar partidas', { type: 'error' });
    }
  },

  createManualMatch: async (team1: Player[], team2: Player[], router)=>{
    try{
      set({isLoading: true})
      
      const team1Ids = team1.map((player: Player) => player.id);
      const team2Ids = team2.map((player: Player) => player.id);

      const response = await server.post('/match', { team1: team1Ids, team2: team2Ids })

      set({match: response.data})

      router.push(`/matchs/${response.data.id}`);
    }catch(e){
      console.log(e)
    }finally{
      set({isLoading: false})
    }
  }
}));
