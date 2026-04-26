// External imports
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Internal imports
import { JWT_CLAVE } from './jwt-constants';
import { JwtPayload } from './jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_CLAVE,
    });
  }

  validate(payload: JwtPayload) {
    // Aquí devolvemos el payload para que esté disponible en req.user
    return { sub: payload.sub, username: payload.username, role: payload.role };
  }
}
