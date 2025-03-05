import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Players } from '../entities/player.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OwnershipGuard implements CanActivate {
  constructor(
    @InjectRepository(Players)
    private readonly playersRepository: Repository<Players>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const playerId = request.params['id'];
    const tokenId = request.tokenPayload['sub'];

    const player = await this.playersRepository.findOneBy({ id: playerId });

    if (!player) {
      throw new NotFoundException('Jogador nao encontrado.');
    }
    return player.userId === tokenId;
  }
}
