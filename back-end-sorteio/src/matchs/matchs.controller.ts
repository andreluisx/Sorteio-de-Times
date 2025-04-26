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
import { MatchsService } from './matchs.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { AuthTokenGuard } from 'src/auth/guards/auth-token.guard';
import { TokenPayloadParam } from 'src/params/token-payload.param';
import { TokenPayloadDto } from 'src/auth/dto/token-payload.dto';
import { OwnershipGuard } from './guards/OwnershipGuard.guard';
import { RandomMatchDto } from './dto/create-random-match.dto';

@UseGuards(AuthTokenGuard)
@Controller('match')
export class MatchsController {
  constructor(private readonly matchsService: MatchsService) {}

  @Post()
  create(
    @Body() createMatchDto: CreateMatchDto,
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
  ) {
    return this.matchsService.create(createMatchDto, tokenPayloadDto);
  }

  @Get()
  findAll(
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.matchsService.findAll(tokenPayloadDto, Number(page), Number(limit));
  }

  @Get('best-duos')
  getTopDuplas(@TokenPayloadParam() tokenPayloadDto: TokenPayloadDto) {
    return this.matchsService.getTopDuplas(tokenPayloadDto);
  }

  @UseGuards(OwnershipGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matchsService.findOne(+id);
  }

  @UseGuards(OwnershipGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchsService.update(+id, updateMatchDto);
  }

  @UseGuards(OwnershipGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matchsService.remove(+id);
  }

  @Post('random')
  radomMatch(
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
    @Body() randomMatchDto: RandomMatchDto,
  ) {
    return this.matchsService.randomMatch(tokenPayloadDto, randomMatchDto);
  }

  @Post('star')
  starBalancedMatch(
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
    @Body() randomMatchDto: RandomMatchDto,
  ) {
    return this.matchsService.starBalancedMatch(
      tokenPayloadDto,
      randomMatchDto,
    );
  }

  @Post('winRate')
  winRateBalancedMatch(
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
    @Body() randomMatchDto: RandomMatchDto,
  ) {
    return this.matchsService.winRateBalancedMatch(
      tokenPayloadDto,
      randomMatchDto,
    );
  }

  @Post('points')
  pointsBalancedMatch(
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
    @Body() randomMatchDto: RandomMatchDto,
  ) {
    return this.matchsService.pointsBalancedMatch(
      tokenPayloadDto,
      randomMatchDto,
    );
  }

  @Get('history-player/:id')
  PlayerMatchs(
    @Param('id') id: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @TokenPayloadParam() tokenPayloadDto: TokenPayloadDto,
  ) {
    return this.matchsService.PlayerMatchs(id, tokenPayloadDto, Number(page), Number(limit));
  }
}
