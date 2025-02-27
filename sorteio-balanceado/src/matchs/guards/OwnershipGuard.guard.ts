import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from '../entities/match.entity';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    @InjectRepository(Match)
    private readonly matchsRepository: Repository<Match>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const playerId = request.params['id'];
    const tokenId = request.tokenPayload['sub'];

    const player = await this.matchsRepository.findOneBy({ id: playerId });

    if (!player) {
      throw new NotFoundException('Jogador nao encontrado.');
    }
    return player.userId === tokenId;
  }
}
