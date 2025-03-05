// stores/playersStore.ts
import { create } from 'zustand';
import { server } from '@/api/server';
import Player from '@/types/playerType';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'react-toastify';

type PlayersState = {
  playersData: Player[];
  matchPlayers: Player[];
  allPlayers: Player[];
  player: Player;
  isLoading: boolean;
  error: string | null;
  stars: number;
  name: string;
};

type PlayersActions = {
  fetchPlayers: () => Promise<void>;
  fetchPlayer: (id: string, router: AppRouterInstance) => Promise<void>;
  createPlayer: (name: string, stars: number) => Promise<void>;
  clearPlayer: () => void;
  togglePlayerBetweenLists: (playerId: string) => void;
  movePlayerToMatch: (playerId: string) => void;
  movePlayerToPlayersData: (playerId: string) => void;
  updatePlayer: (playerId: string, name?: string, stars?: number) => void;
};

export const usePlayersStore = create<PlayersState & PlayersActions>((set) => {
  return {
    playersData: [],
    matchPlayers: [],
    player: {
      id: '',
      loses: 0,
      matchs: 0,
      name: '',
      rank: 'silver',
      stars: 0,
      winRate: 0,
      wins: 0,
    },
    isLoading: false,
    error: null,
    stars: 0,
    name: '',
    allPlayers: [],

    fetchPlayers: async () => {
      set({ isLoading: true, error: null });

      try {
        const token = localStorage.getItem('userToken');

        if (!token) {
          throw new Error('Token de autenticação não encontrado');
        }

        const response = await server.get('/players', {
          headers: { Authorization: `Bearer ${token}` },
        });

        set((state) => ({
          playersData: response.data.filter(
            (player: Player) =>
              !state.matchPlayers.some((mp) => mp.id === player.id)
          ),
          isLoading: false,
          allPlayers: response.data,
        }));
      } catch (error) {
        console.error('Erro ao carregar os players:', error);
        set({ error: 'Erro ao carregar os players', isLoading: false });
      }
    },

    fetchPlayer: async (id: string) => {
      set({ isLoading: true, error: null });

      try {
        const token = localStorage.getItem('userToken');

        if (!token) {
          throw new Error('Token de autenticação não encontrado');
        }

        const response = await server.get(`/players/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        set({ player: response.data, isLoading: false });
      } catch (error) {
        console.error('Erro ao carregar o player:', error);
        set({ error: 'Erro ao carregar o player', isLoading: false });
      }
    },

    createPlayer: async (name: string, stars: number) => {
      set({ isLoading: true });
      try {
        const token = localStorage.getItem('userToken');

        if (!token) {
          throw new Error('Token de autenticação não encontrado');
        }

        const response = await server.post(
          '/players',
          { name, stars },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        set((state) => ({
          playersData: [...state.playersData, response.data],
          isLoading: false,
        }));
      } catch (error) {
        console.error('Erro ao criar player:', error);
        set({ error: 'Erro ao criar player', isLoading: false });
      }
    },

    // Função para alternar um jogador entre as listas
    togglePlayerBetweenLists: (playerId: string) => {
      set((state) => {
        // Verifica em qual lista o jogador está
        const playerInPlayersData = state.playersData.find(
          (p) => p.id === playerId
        );
        const playerInMatchPlayers = state.matchPlayers.find(
          (p) => p.id === playerId
        );

        if (playerInPlayersData) {
          // Move o jogador de playersData para matchPlayers
          return {
            playersData: state.playersData.filter((p) => p.id !== playerId),
            matchPlayers: [...state.matchPlayers, playerInPlayersData],
          };
        } else if (playerInMatchPlayers) {
          // Move o jogador de matchPlayers para playersData
          return {
            matchPlayers: state.matchPlayers.filter((p) => p.id !== playerId),
            playersData: [...state.playersData, playerInMatchPlayers],
          };
        }

        return {};
      });
    },

    // Função específica para mover um jogador para a lista de partida
    movePlayerToMatch: (playerId: string) => {
      set((state) => {
        // Procura o jogador na lista de playersData
        const playerInPlayersData = state.playersData.find(
          (p) => p.id === playerId
        );
        const playerInMatchPlayers = state.matchPlayers.find(
          (p) => p.id === playerId
        );

        if (playerInPlayersData) {
          // Move o jogador de playersData para matchPlayers
          return {
            playersData: state.playersData.filter((p) => p.id !== playerId),
            matchPlayers: [...state.matchPlayers, playerInPlayersData],
          };
        } else if (playerInMatchPlayers) {
          // Se o jogador já está na lista de partida, move-o de volta para playersData
          return {
            matchPlayers: state.matchPlayers.filter((p) => p.id !== playerId),
            playersData: [...state.playersData, playerInMatchPlayers],
          };
        }

        console.warn(
          `Player com ID ${playerId} não encontrado na lista de players.`
        );
        return {};
      });
    },

    // Função específica para mover um jogador para a lista principal
    movePlayerToPlayersData: (playerId: string) => {
      set((state) => {
        // Procura o jogador na lista de matchPlayers
        const playerInMatchPlayers = state.matchPlayers.find(
          (p) => p.id === playerId
        );

        if (playerInMatchPlayers) {
          // Move o jogador de matchPlayers para playersData
          return {
            matchPlayers: state.matchPlayers.filter((p) => p.id !== playerId),
            playersData: [...state.playersData, playerInMatchPlayers],
          };
        }

        console.warn(
          `Player com ID ${playerId} não encontrado na lista de partida.`
        );
        return {};
      });
    },

    updatePlayer: async (playerId: string, name?: string, stars?: number) => {
      try {
        set({ isLoading: true });
        const token = localStorage.getItem('userToken');

        if (!token) {
          throw new Error('Token de autenticação não encontrado');
        }

        const response = await server.patch(
          `/players/${playerId}`,
          { name, stars },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        set({ player: response.data, isLoading: false });
        toast('usuario alterado com sucesso', { type: 'success' });
      } catch (error) {
        toast('Ocorreu um problema', { type: 'error' });
        set({ isLoading: false });
      }
    },

    clearPlayer: ()=>{
      set({player: undefined})
    }
  };
});
