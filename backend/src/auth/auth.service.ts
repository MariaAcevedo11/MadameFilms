// Author: María Acevedo

// External imports
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Internal imports
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtPayload } from './types/jwt-payload.type';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<{ access_token: string }> {
    const { email, password } = dto;

    const user = await this.usersService.findByEmail(email);

    if (!user || user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }

  async register(dto: RegisterDto): Promise<{ access_token: string }> {
    const user = await this.usersService.create({
      username: dto.username,
      email: dto.email,
      password: dto.password,
      image: dto.image,
      role: dto.role,
    });

    const payload: JwtPayload = {
      id: user.id,
      username: user.username,
      role: user.role,
    };
    const accessToken = await this.jwtService.signAsync(payload);

    return { access_token: accessToken };
  }

  async getProfile(jwtPayload: JwtPayload): Promise<User | null> {
    return this.usersService.findOne(jwtPayload.id);
  }
}
