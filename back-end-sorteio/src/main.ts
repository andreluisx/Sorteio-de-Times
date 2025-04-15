import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { LoggerMiddleware } from './middleware/logger.middleware';
import { json, NextFunction, Request, Response, urlencoded } from 'express';
import * as bodyParser from 'body-parser';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(process.env.STRIPE_SECRET_KEY);
  // ⛔ Skip bodyParser ONLY for /webhook
  app.use(bodyParser.json({
    verify: (req: any, res, buf) => {
      req.rawBody = buf.toString();
    }
  }));

  app.use(urlencoded({ extended: true }));

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,PATCH',
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: false,
    }),
  );

  app.use(new LoggerMiddleware().use);

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
