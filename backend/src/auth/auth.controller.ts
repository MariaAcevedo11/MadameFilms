// External imports
import { Body, Controller, Get, Post } from '@nestjs/common';

// Internal imports
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() body: { email: string; password: string }): Promise<User> {
    return this.authService.login(body.email, body.password);
  }

  @Get('me')
  getCurrentUser(): User | null {
    return this.authService.getCurrentUser();
  }

  @Post('logout')
  logout(): void {
    return this.authService.logout();
  }
}
