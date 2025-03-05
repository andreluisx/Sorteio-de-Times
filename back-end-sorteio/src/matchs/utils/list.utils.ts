import { Players } from 'src/players/entities/player.entity';
import { BalancedTypes } from './balanced-types.enum';

// Função para embaralhar uma lista
export function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Função para dividir uma lista em duas partes
export function splitArray<T>(array: T[]): [T[], T[]] {
  const meio = Math.ceil(array.length / 2);
  return [array.slice(0, meio), array.slice(meio)];
}

// Interface completa para referência
interface FullPlayers extends Players {
  winRate: number;
  matchs: number;
  rank: string;
}

// Função para criar cópias seguras mantendo todas as propriedades
function createPlayerCopy(player: Players): FullPlayers {
  return {
    ...player,
    winRate: player.winRate || 0, // Valor padrão se não existir
    matchs: player.matchs || 0, // Valor padrão se não existir
    rank: player.rank || 'ferro', // Valor padrão se não existir
  };
}

// Função principal corrigida
function balancedRandomTeams(
  players: Players[],
  type: 'stars' | 'winRate',
): [Players[], Players[]] {
  // 1. Cria cópias completas dos jogadores
  const safePlayers = players.map(createPlayerCopy);

  // 2. Ordenação com ruído controlado
  const sortedPlayers = [...safePlayers].sort((a, b) => {
    const noise = 0.1;
    const aValue = a[type] * (1 + (Math.random() - 0.5) * noise);
    const bValue = b[type] * (1 + (Math.random() - 0.5) * noise);
    return bValue - aValue;
  });

  // 3. Distribuição balanceada
  const team1: FullPlayers[] = [];
  const team2: FullPlayers[] = [];
  let switchTeams = false;

  sortedPlayers.forEach((player, index) => {
    if (index % 2 === 0 && Math.random() < 0.25) {
      switchTeams = !switchTeams;
    }

    const targetTeam = index % 2 === Number(switchTeams) ? team1 : team2;
    targetTeam.push(player);
  });

  // ... (restante da lógica de balanceamento permanece igual)

  return [team1, team2];
}

// Função principal de balanceamento
export function BalancedTeams(
  array: Players[],
  type: string,
): [Players[], Players[]] {
  // Embaralha array antes do balanceamento
  const shuffledArray = shuffleArray([...array]);

  switch (type) {
    case BalancedTypes.stars:
      return balancedRandomTeams(shuffledArray, 'stars');

    case BalancedTypes.winRate:
      return balancedRandomTeams(shuffledArray, 'winRate');

    default:
      return splitArray(shuffledArray);
  }
}
