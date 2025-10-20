import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useWebSocketAdapter(new IoAdapter(app))
  const config = new DocumentBuilder()
    .setTitle('Rashla')
    .setDescription('Documentacion Rashla')
    .setVersion('1.0')
    .addTag('Rashla')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableCors();
  app.use(json({ limit: '300mb' }));
  app.use(urlencoded({ extended: true, limit: '300mb' }));
  app.useGlobalPipes(new ValidationPipe());
  if(process.env.NODE_ENV=="dev"){
    app.useStaticAssets(join(__dirname, '..', 'public'));  //para DEV
    await app.listen(parseInt(process.env.PORT));// para DEV
  }else{
    app.useStaticAssets(join(__dirname, 'public')); //para VPS
    await app.listen(parseInt(process.env.PORT));// para el VPS admin
  }
}
bootstrap();