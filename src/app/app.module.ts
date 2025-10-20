import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AtGuard } from './modules/common/guards';
import { ConfigModule } from '@nestjs/config';
import { EncryptionService } from './encrypt.service';
import { HttpModule } from '@nestjs/axios';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    ScheduleModule.forRoot()
  ],
  controllers: [AppController],
  providers: [
    EncryptionService,
    AtGuard,
    AppService
  ],
})
export class AppModule { }
