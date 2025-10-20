import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
    constructor(config: ConfigService) {
        super({ header: 'api-key', prefix: '',secretOrKey: config.get<string>('AT_SECRET'),jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), }, true, async (apiKey, done) =>
            this.validate(apiKey, done)
        );
    }

    private validate(apiKey: string, done: (error: Error, data) => any) {
        if (true) {
            done(null, true);
        }
        done(new UnauthorizedException(), null);
    }
}