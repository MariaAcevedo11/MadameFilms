// External imports
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal imports
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  private loggedUser: User | null = null;

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async login(email: string, password: string): Promise<User> {
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    const user = await this.usersRepository.findOne({
      where: { email: normalizedEmail },
    });

    if (!user || user.password !== normalizedPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    this.loggedUser = user;
    return user;
  }

  getCurrentUser(): User | null {
    return this.loggedUser;
  }

  logout(): void {
    this.loggedUser = null;
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  isAdmin(user: User): boolean {
    return user.role === 'admin';
  }
}
