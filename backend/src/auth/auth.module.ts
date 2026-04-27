// External imports
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

// Internal imports
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWT_CLAVE } from './jwt/jwt-constants';
import { JwtStrategy } from './jwt/jwt-strategy';
import { UsersModule } from '../users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      global: true,
      secret: JWT_CLAVE,
      signOptions: { expiresIn: '1d' },
    }),
  ],
})
export class AuthModule {}
