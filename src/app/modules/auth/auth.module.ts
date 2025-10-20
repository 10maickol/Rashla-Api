import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { ApiKeyStrategy } from './strategies/apiKeyStrategy';

@Module({
  imports: [JwtModule.register({}),],
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RtStrategy, ApiKeyStrategy],
})
export class AuthModule { }
