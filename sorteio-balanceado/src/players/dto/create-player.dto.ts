import {
  IsAlphanumeric,
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Min(0, { message: 'o numero de estrelas deve ser maior igual a 0' })
  @Max(10, { message: 'o numero de estrelas deve ser menor que 10' })
  @IsInt({ message: 'as estrelas precisam ser um numero de 0 a 10' })
  @IsNotEmpty({ message: 'defina a quantidade de estrelas' })
  stars: number;
}
