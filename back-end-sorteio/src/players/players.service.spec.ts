import { Repository } from 'typeorm';
import { Players } from './entities/player.entity';
import { CreatePlayerDto } from './dto/create-player.dto';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { create } from 'domain';
import { v4 as uuid } from 'uuid';

// Mock UUID para controle nos testes
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('Players Service', () => {
  let playersService: PlayersService;
  let playersRepository: Repository<Players>;
  let createPlayerDto: CreatePlayerDto;
  let tokenPayloadDto: TokenPayloadDto = {
    sub: 'user-id-123',
    email: 'teste@email.com',
  };

  const mockUuid = 'mock-uuid-1234';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlayersService,
        {
          provide: getRepositoryToken(Players),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    playersService = module.get<PlayersService>(PlayersService);
    playersRepository = module.get<Repository<Players>>(
      getRepositoryToken(Players),
    );

    (uuid as jest.Mock).mockReturnValue(mockUuid);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Tudo foi inicializado', () => {
    expect(playersRepository).toBeDefined();
    expect(playersService).toBeDefined();
  });

  test('Criar um Jogador', async () => {
  
    const createPlayerDto: CreatePlayerDto = {
      name: 'andre',
      stars: 7,
    };
  
    const playerToSave = {
      id: mockUuid,
      ...createPlayerDto,
      userId: tokenPayloadDto.sub,
    };
  
    const savedPlayer = {
      ...playerToSave,
      wins: 0,
      loses: 0,
      isActive: true,
      points: 800,
      createdAt: new Date(),
      updatedAt: new Date(),
      deleted_at: null,
    };
  
    jest
      .spyOn(playersRepository, 'create')
      .mockReturnValue(createPlayerDto as any);

    jest.spyOn(playersRepository, 'save').mockResolvedValue(savedPlayer as any);
  
    const result = await playersService.create(
      createPlayerDto,
      tokenPayloadDto,
    );

    expect(playersRepository.create).toHaveBeenCalledWith(createPlayerDto);
  
    expect(playersRepository.save).toHaveBeenCalledWith(playerToSave);
  
    expect(result).toEqual(playerToSave); 
  });

  test('Testando o retorno de todos os jogadores', ()=>{

  })

});
