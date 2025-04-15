import { Injectable } from '@nestjs/common';
import { shuffleArray, splitArray, BalancedTeams } from './utils/list.utils';
import { Players } from 'src/players/entities/player.entity';
import { BalancedTypes } from './utils/balanced-types.enum';

@Injectable()
export class ListService {
  // Método para embaralhar uma lista
  shuffle<T>(list: T[]): T[] {
    return shuffleArray(list);
  }

  // Método para dividir uma lista em duas partes
  split<T>(list: T[]): [T[], T[]] {
    return splitArray(list);
  }

  BalancedTeam(list: Players[], type: BalancedTypes): [Players[], Players[]] {
    return BalancedTeams(list, type);
  }
}
