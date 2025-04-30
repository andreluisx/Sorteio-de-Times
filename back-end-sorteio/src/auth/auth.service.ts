import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingServiceProtocol } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { User } from './entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { v4 as uuid } from 'uuid';
import { TokenPayloadDto } from './dto/token-payload.dto';
import { UpdateUserDto } from './dto/updateUserDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashingService: HashingServiceProtocol,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    let passwordIsValid = false;

    const pessoa = await this.userRepository.findOneBy({
      email: loginDto.email,
    });

    if (!pessoa) {
      throw new UnauthorizedException('Usuário não autorizado, ou não existe');
    }

    passwordIsValid = await this.hashingService.compare(
      loginDto.password,
      pessoa.password,
    );

    if (!passwordIsValid) {
      throw new UnauthorizedException('Usuário ou senha incorretas');
    }

    return await this.createTokens(pessoa);
  }

  private async createTokens(pessoa: User) {
    const accessToken = await this.signJwtAsync<Partial<User>>(
      pessoa.id,
      this.jwtConfiguration.jwtTtl,
      { email: pessoa.email, isPremium: pessoa.isPremium },
    );

    const refreshToken = await this.signJwtAsync<Partial<User>>(
      pessoa.id,
      this.jwtConfiguration.jwtRefreshTtl,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  private async signJwtAsync<T>(sub: string, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub,
        ...payload,
      },
      {
        audience: this.jwtConfiguration.audicence,
        issuer: this.jwtConfiguration.issuer,
        secret: this.jwtConfiguration.secret,
        expiresIn,
      },
    );
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub } = await this.jwtService.verifyAsync(
        refreshTokenDto.refreshToken,
        this.jwtConfiguration,
      );

      const pessoa = await this.userRepository.findOneBy({
        id: sub,
      });

      if (!pessoa) {
        throw new Error('Acesso não autorizado');
      }
      return this.createTokens(pessoa);
    } catch (e) {
      throw new ForbiddenException('Usuário não autorizado, ou não existe');
    }
  }

  async register(registerDto: RegisterDto) {
    try {

      const passwordHash = await this.hashingService.hash(registerDto.password);

      const userdata = {
        id: uuid(),
        email: registerDto.email,
        password: passwordHash,
      };

      const userCreated = this.userRepository.create(userdata);
      return await this.userRepository.save(userCreated);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('E-mail já está cadastrado.');
      }
  
      console.error('Erro ao registrar usuário:', e);
      throw e; 
    }
  }

  async checkAuth(tokenPayload: TokenPayloadDto) {
    // Busca o usuário no banco de dados com base no userId ou email
    const user = await this.userRepository.findOneBy({
      id: tokenPayload?.sub,
    });

    if (!user) {
      throw new UnauthorizedException('Usuário não encontrado');
    }

    const {password, ...userData } = user;
    return userData;
  }

  async update(updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.findOneBy({ email: updateUserDto.email });
      
      if (!user) {
        throw new NotAcceptableException('Usuário não encontrado');
      }
  
      // Atualiza isPremium se fornecido
      if (updateUserDto.isPremium !== undefined) {
        user.isPremium = updateUserDto.isPremium;
      }
  
      // Atualiza a senha se fornecida
      if (updateUserDto.password) {
        user.password = await this.hashingService.hash(updateUserDto.password);
      }
  
      await this.userRepository.save(user);
      
      return { message: 'Usuário atualizado com sucesso' };
    } catch (e) {
      console.error('Erro ao atualizar usuário:', e);
      throw new ConflictException('Erro ao atualizar usuário');
    }
  }

}
