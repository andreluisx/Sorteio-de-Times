import { IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty({ message: 'O refreshToken não está sendo enviado' })
  refreshToken: string;
}
