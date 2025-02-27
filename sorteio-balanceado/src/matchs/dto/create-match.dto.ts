import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateMatchDto {
  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  team1: string[];

  @IsNotEmpty()
  @IsArray()
  @IsUUID('4', { each: true })
  team2: string[];
}
