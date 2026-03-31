import { Actress } from './entities/actress.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ActressesService {
  constructor(
    @InjectRepository(Actress)
    private ActressesRepository: Repository<Actress>,
  ) {}

  findAll(): Promise<Actress[]> {
    return this.ActressesRepository.find();
  }

  findOne(id: number): Promise<Actress | null> {
    return this.ActressesRepository.findOneBy({ id });
  }
}
