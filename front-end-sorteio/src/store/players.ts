// stores/playersStore.ts
import { create } from 'zustand';
import { server } from '@/api/server';
import Player from '@/types/playerType';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { toast } from 'react-toastify';
import { IMatchType } from '@/types/matchType';
import { ResMatch } from './matchs';

type PlayersState = {
  playersData: Player[];
  matchPlayers: Player[];
  allPlayers: Player[];
  playersTeam1: Player[];
  playersTeam2: Player[];
  banco: Player[];
  player: Player;
  isLoading: boolean;
  error: string | null;
  stars: number;
  name: string;
  playerMatchs: ResMatch;
  matchLoading: boolean;
};

type PlayersActions = {
  fetchPlayers: (name: string) => Promise<void>;
  fetchPlayer: (id: string) => Promise<void>;
  fetchHistoryPlayer: (
    id: string,
    page: number,
    limit: number
  ) => Promise<void>;
  createPlayer: (name: string, stars: number) => Promise<void>;
  deletePlayer: (id: string, router: AppRouterInstance) => Promise<void>;
  clearPlayer: () => void;
  togglePlayerBetweenLists: (playerId: string) => void;
  movePlayerToMatch: (playerId: string) => void;
  movePlayerToPlayersData: (playerId: string) => void;
  updatePlayer: (playerId: string, name?: string, stars?: number) => void;
  fetchNoRepeatPlayers: () => void;
  movePlayer: (playerId: string, to: 'team1' | 'team2' | 'banco') => void;
  setPlayerStatus: (playerId: string, status: Player['status']) => void;
};

export const usePlayersStore = create<PlayersState & PlayersActions>(
  (set, get) => {
    return {
      playersData: [],
      matchPlayers: [],
      playersTeam1: [],
      playersTeam2: [],
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
      matchLoading: false,
      isLoading: false,
      error: null,
      stars: 0,
      name: '',
      allPlayers: [],
      playerMatchs: [],

      fetchPlayers: async (name: string = '') => {
        set({ isLoading: true, error: null });
        if (name === '') {
          try {
            const response = await server.get(`/players?=${name}`);

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
        }
        if (name !== '') {
          try {
            const response = await server.get(`/players?name=${name}`);
            set({
              playersData: response.data,
              isLoading: false,
              allPlayers: response.data,
            });
          } catch (e) {
            toast(`Ocorreu um problema: ${e.message}`, { type: 'error' });
          }
        }
      },

      fetchPlayer: async (id: string) => {
        set({ isLoading: true, error: null });

        try {
          const response = await server.get(`/players/${id}`);

          set({
            player: response.data,
            isLoading: false,
          });
        } catch (error) {
          set({ error: 'Erro ao carregar o player', isLoading: false });
        }
      },

      fetchHistoryPlayer: async (
        id: string,
        page: number = 1,
        limit: number = 10
      ) => {
        set({ matchLoading: true, error: null });

        try {
          const response = await server.get(
            `/match/history-player/${id}?page=${page}&limit=${limit}`
          );

          set((state) => ({
            playerMatchs: {
              ...response.data,
              data:
                page === 1
                  ? response.data.data
                  : [...state.playerMatchs.data, ...response.data.data],
            },
          }));
        } catch (error) {
          set({ error: 'Erro ao carregar o player' });
        } finally {
          set({ matchLoading: false });
        }
      },

      createPlayer: async (name: string, stars: number) => {
        set({ isLoading: true });
        try {
          const response = await server.post('/players', { name, stars });
          set((state) => ({
            playersData: [
              ...state.playersData,
              { ...response.data, rank: 'Prata' },
            ],
            allPlayers: [
              ...state.allPlayers,
              { ...response.data, rank: 'Prata' },
            ],
            isLoading: false,
          }));
        } catch (error) {
          console.error('Erro ao criar player:', error);
          set({ error: 'Erro ao criar player', isLoading: false });
        }
      },

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

          const response = await server.patch(`/players/${playerId}`, {
            name,
            stars,
          });

          set({ player: response.data, isLoading: false });
          toast('usuario alterado com sucesso', { type: 'success' });
        } catch (error) {
          toast('Ocorreu um problema', { type: 'error' });
          set({ isLoading: false });
        }
      },

      deletePlayer: async (id: string, router: AppRouterInstance) => {
        set({ isLoading: true });
        try {
          await server.patch(`/players/remove/${id}`);
          router.push('/players-estatistics/players');
        } catch (error) {
          console.log(error);
          toast(
            error.response?.data?.message || 'Problema ao deletar jogador',
            { type: 'error' }
          );
        } finally {
          set({ isLoading: false });
        }
      },

      clearPlayer: () => {
        set({ player: undefined });
      },

      setPlayerStatus: (playerId: string, status: string) => {
        const { allPlayers } = get();
        const updatedPlayer = allPlayers.find((p) => p.id === playerId);
        if (!updatedPlayer) return;

        // Remove dos dois times
        const team1 = get().playersTeam1.filter((p) => p.id !== playerId);
        const team2 = get().playersTeam2.filter((p) => p.id !== playerId);

        if (status === 'time_1') team1.push(updatedPlayer);
        else if (status === 'time_2') team2.push(updatedPlayer);

        set({ playersTeam1: team1, playersTeam2: team2 });
      },
    };
  }
);
