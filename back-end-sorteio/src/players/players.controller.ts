import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { TokenPayloadParam } from 'src/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { OwnershipGuard } from './guards/OwnershipGuard.guard';

@UseGuards(AuthTokenGuard)
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  create(
    @Body() createPlayerDto: CreatePlayerDto,
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.playersService.create(createPlayerDto, tokenPayload);
  }

  @Get('better-balanced')
  betterBalancedPlayers(
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.playersService.betterBalancedPlayers(tokenPayload);
  }

  @Get('better-players')
  betterPlayers(
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.playersService.betterPlayers(tokenPayload);
  }

  @Get()
  findAll(
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
    @Query('name') name?: string, // Filtro por nome
  ) {
    return this.playersService.findAll({
      userId: tokenPayload.sub,
      name,
    });
  }

  @UseGuards(OwnershipGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playersService.findOne(id);
  }

  @UseGuards(OwnershipGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.update(id, updatePlayerDto);
  }

  @UseGuards(OwnershipGuard)
  @Patch('remove/:id')
  remove(@Param('id') id: string) {
    return this.playersService.remove(id);
  }
}
