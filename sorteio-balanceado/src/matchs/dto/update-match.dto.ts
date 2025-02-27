import { PartialType } from '@nestjs/mapped-types';
import { CreateMatchDto } from './create-match.dto';
import { IsNumber, Max, Min } from 'class-validator';

export class UpdateMatchDto extends PartialType(CreateMatchDto) {
  @IsNumber()
  @Max(2, { message: 'O time que venceu não foi definido corretamente' })
  @Min(1, { message: 'O time que venceu não foi definido corretamente' })
  winner?: number;
}
