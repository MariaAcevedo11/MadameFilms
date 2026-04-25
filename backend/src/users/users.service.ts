// External imports
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Internal imports
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const userExists = await this.usersRepository.findOneBy({
      username: dto.username,
    });

    if (userExists) {
      throw new ConflictException('User already exists');
    }

    const emailExists = await this.usersRepository.findOneBy({
      email: dto.email,
    });

    if (emailExists) {
      throw new ConflictException('Email already exists');
    }

    return this.usersRepository.save(dto);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    if (updateUserDto.username) {
      const usernameExists = await this.usersRepository.findOneBy({
        username: updateUserDto.username,
      });

      if (usernameExists && usernameExists.id !== user.id) {
        throw new ConflictException('Username already exists');
      }
    }

    if (updateUserDto.email) {
      const emailExists = await this.usersRepository.findOneBy({
        email: updateUserDto.email,
      });

      if (emailExists && emailExists.id !== user.id) {
        throw new ConflictException('Email already exists');
      }
    }

    const updatedUser = this.usersRepository.create({
      ...user,
      ...updateUserDto,
    });

    return this.usersRepository.save(updatedUser);
  }

  async delete(id: number): Promise<void> {
    const user = await this.findOne(id);
    await this.usersRepository.remove(user);
  }
}
