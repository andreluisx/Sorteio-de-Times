import { IsArray, IsNotEmpty } from 'class-validator';

export class RandomMatchDto {
  @IsNotEmpty()
  @IsArray()
  players: string[];
}
