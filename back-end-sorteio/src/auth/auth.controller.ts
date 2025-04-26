import { Body, Controller, Get, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { RegisterDto } from './dto/register.dto';
import { TokenPayloadParam } from 'src/params/token-payload.param';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { AuthTokenGuard } from './guards/auth-token.guard';
import { UpdateUserDto } from './dto/updateUserDto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('refresh')
  refreshTokens(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshTokens(refreshTokenDto);
  }

  @UseGuards(AuthTokenGuard)
  @Get('me')
  checkAuth(
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
  ) {
    return this.authService.checkAuth(tokenPayload);
  }

  @UseGuards(AuthTokenGuard)
  @Patch('me')
  updateUser(
    @TokenPayloadParam() tokenPayload: TokenPayloadDto,
    @Body() updateUserDto: UpdateUserDto, 
  ){
    return this.authService.update(tokenPayload.sub, updateUserDto)
  }

}
