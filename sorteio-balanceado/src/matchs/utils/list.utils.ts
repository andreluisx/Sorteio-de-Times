import { Players } from 'src/players/entities/player.entity';
import { BalancedTypes } from './balanced-types.enum';

interface SortedTypes {
  star: string;
  winRate: string;
}

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
  const primeiraParte = array.slice(0, meio);
  const segundaParte = array.slice(meio);
  return [primeiraParte, segundaParte];
}

export function BalancedTeams(
  array: Players[],
  type: string,
): [Players[], Players[]] {
  let sortedPlayers = [];
  // Ordena os jogadores por estrelas (do maior para o menor)
  if (type == BalancedTypes.stars) {
    sortedPlayers = array.sort((a, b) => b.stars - a.stars);
  }
  // Ordena os jogadores por winRate (do maior para o menor)
  if (type == BalancedTypes.winRate) {
    sortedPlayers = array.sort((a, b) => b.winRate - a.winRate);
  }

  // Divide os jogadores em dois times
  const team1: Players[] = [];
  const team2: Players[] = [];

  for (let i = 0; i < sortedPlayers.length; i++) {
    if (i % 2 === 0) {
      team1.push(sortedPlayers[i]);
    } else {
      team2.push(sortedPlayers[i]);
    }
  }

  return [team1, team2];
}
