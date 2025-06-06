import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CacheInterceptor, CacheModule } from '@nestjs/cache-manager';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigType } from '@nestjs/config';

import { AppController } from './app.controller';
import appConfig from './app.config';
import { Players } from 'src/players/entities/player.entity';
import { PlayersModule } from 'src/players/players.module';
import { MatchsModule } from 'src/matchs/matchs.module';
import { AuthModule } from 'src/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingCacheInterceptor } from 'src/interceptors/LoggingCacheInterceptor';

@Module({
  imports: [
    CacheModule.register({
      ttl: 10000,
      max: 10,
      isGlobal: true,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(appConfig)],

      inject: [appConfig.KEY],
      useFactory: async (appConfigurations: ConfigType<typeof appConfig>) => {
        return {
          type: appConfigurations.database.type,
          host: appConfigurations.database.host,
          port: appConfigurations.database.port,
          username: appConfigurations.database.username,
          database: appConfigurations.database.database,
          password: appConfigurations.database.password,
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    PlayersModule,
    MatchsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingCacheInterceptor,
    },
  ],
})
export class AppModule {}
