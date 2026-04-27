// Author: María Acevedo

// External imports
import { AuthGuard } from '@nestjs/passport';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

// Internal imports
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from './types/jwt-payload.type';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto): Promise<{ access_token: string }> {
    return this.authService.login(dto);
  }

  @Post('register')
  register(@Body() dto: RegisterDto): Promise<{ access_token: string }> {
    return this.authService.register(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(
    @Request() req: Request & { user: JwtPayload },
  ): Promise<User | null> {
    const user = await this.authService.getProfile(req.user);

    return user;
  }
}
