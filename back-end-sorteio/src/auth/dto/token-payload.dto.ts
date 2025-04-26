export class TokenPayloadDto {
  sub: string;
  email: string;
  isPremium?: boolean;
  iat?: number;
  exp?: number;
  aud?: string;
  iss?: string;
}
