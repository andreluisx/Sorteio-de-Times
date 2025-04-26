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

function balancedRandomTeams(
  players: Players[],
  type: BalancedTypes,
): [Players[], Players[]] {
  // 1. Cria cópias dos jogadores para evitar mutações
  const playersCopy = JSON.parse(JSON.stringify(players)) as Players[];

  // 2. Adiciona ruído controlado baseado no tipo de balanceamento
  const ratedPlayers = playersCopy.map((player) => ({
    player,
    rating: getPlayerRating(player, type),
  }));

  // 3. Ordena com ruído aleatório controlado
  const sortedPlayers = [...ratedPlayers].sort((a, b) => {
    // Ruído de 10-15% para manter aleatoriedade
    const noiseFactor = 0.15;
    const aNoise = a.rating * (1 + (Math.random() - 0.5) * noiseFactor);
    const bNoise = b.rating * (1 + (Math.random() - 0.5) * noiseFactor);
    return bNoise - aNoise;
  });

  // 4. Distribuição balanceada com aleatoriedade controlada
  const team1: Players[] = [];
  const team2: Players[] = [];
  let teamSwitch = false;

  sortedPlayers.forEach(({ player }, index) => {
    // 25% de chance de inverter a distribuição a cada 2 jogadores
    if (index % 2 === 0 && Math.random() < 0.25) {
      teamSwitch = !teamSwitch;
    }

    // Distribui alternadamente com possibilidade de inversão
    const targetTeam = index % 2 === Number(teamSwitch) ? team1 : team2;
    targetTeam.push(player);
  });

  // 5. Verificação e ajuste final do balanceamento
  return adjustTeamBalance(team1, team2, type);
}

// Função auxiliar para calcular o rating do jogador
function getPlayerRating(player: Players, type: BalancedTypes): number {
  const normPoints = (player.points - 900) / 1100; // Normaliza para 0–1 (aprox.)

  switch (type) {
    case BalancedTypes.stars:
      return player.stars * (1 + player.winRate / 200) + normPoints * 5;
    case BalancedTypes.winRate:
      return player.winRate * (1 + player.stars / 10) + normPoints * 5;
    case BalancedTypes.points:
      return player.points * (1 + (player.winRate - 50) / 100); // Mantém igual
    default:
      return (player.stars + player.winRate) / 2 + normPoints * 10;
  }
}

// Ajuste final para garantir equilíbrio
function adjustTeamBalance(
  team1: Players[],
  team2: Players[],
  type: BalancedTypes,
): [Players[], Players[]] {
  const total1 = calculateTeamTotal(team1, type);
  const total2 = calculateTeamTotal(team2, type);
  const diff = Math.abs(total1 - total2);

  // Se a diferença for maior que 15%, faz um ajuste
  if (diff / Math.max(total1, total2) > 0.1) {
    // Encontra o jogador que melhor equilibra os times
    const [strongerTeam, weakerTeam] =
      total1 > total2 ? [team1, team2] : [team2, team1];

    strongerTeam.sort(
      (a, b) => getPlayerRating(a, type) - getPlayerRating(b, type),
    );
    weakerTeam.sort(
      (a, b) => getPlayerRating(b, type) - getPlayerRating(a, type),
    );

    // Troca os jogadores mais equilibradores
    if (strongerTeam.length > 0 && weakerTeam.length > 0) {
      const swapIndex = Math.floor(
        Math.random() * Math.min(2, strongerTeam.length, weakerTeam.length),
      );
      [strongerTeam[swapIndex], weakerTeam[swapIndex]] = [
        weakerTeam[swapIndex],
        strongerTeam[swapIndex],
      ];
    }
  }

  return [team1, team2];
}

function calculateTeamTotal(team: Players[], type: BalancedTypes): number {
  return team.reduce((sum, player) => sum + getPlayerRating(player, type), 0);
}

// Função principal exportada
export function BalancedTeams(
  array: Players[],
  type: BalancedTypes, // Alterado de string para BalancedTypes
): [Players[], Players[]] {
  // Embaralha array antes do balanceamento
  const shuffledArray = [...array].sort(() => Math.random() - 0.5);

  switch (type) {
    case BalancedTypes.stars:
    case BalancedTypes.winRate:
    case BalancedTypes.points:
      return balancedRandomTeams(shuffledArray, type);
    default:
      const middle = Math.ceil(shuffledArray.length / 2);
      return [shuffledArray.slice(0, middle), shuffledArray.slice(middle)];
  }
}
