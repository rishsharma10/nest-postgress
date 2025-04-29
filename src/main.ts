import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from "fs";
import * as express from 'express';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { config } from 'dotenv';
import { NestExpressApplication } from '@nestjs/platform-express';

config()
const PORT = process.env.PORT || 3001; 

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({ type: VersioningType.URI }); // URL versioning e.g., /v1/auth
  app.enableCors();
  app.use(express.json());
  app.set('trust proxy', 1);
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true, skipMissingProperties: true  }));
  app.useGlobalPipes(new ValidationPipe({ skipMissingProperties: true, transform: true, whitelist: true }));
  const config = new DocumentBuilder()
    .setTitle('Test App')
    .setDescription('Test API description')
    .setVersion('1.0') 
    .addBearerAuth({ type: 'http', name: 'authorization', in: 'header' }, 'authorization')
    .addServer(`http://localhost:3009/`, "local server")
    .addServer('https://3dd5-2404-7c80-64-d396-2ddc-6e3a-f3e5-a0a8.ngrok-free.app', 'Ngrok tunnel') // ✅ Add ngrok as a Swagger server
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.listen(PORT);
  console.log(`Server running at port ${PORT}....`);
}


bootstrap();
