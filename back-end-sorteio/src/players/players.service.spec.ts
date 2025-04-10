import { Repository } from 'typeorm';
import { Players } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Players Service', () => {
  let playersService: PlayersService;
  let playersRepository: Repository<Players>;
  let createPlayerDto: CreatePlayerDto;
  let TokenPayloadDto: TokenPayloadDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getRepositoryToken(Players),
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();
    playersService = module.get<PlayersService>(PlayersService);
    playersRepository = module.get<Repository<Players>>(getRepositoryToken(Players));
  });

  test('Tudo foi inicializado', () => {
    expect(playersRepository).toBeDefined()
    expect(playersService).toBeDefined()
  });

  describe('Criar um Jogador', () => {
    
  });
});
