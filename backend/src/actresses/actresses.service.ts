import { Actress } from './entities/actress.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateActressDto } from './dto/create-actress.dto';

@Injectable()
export class ActressesService {
  constructor(
    @InjectRepository(Actress)
    private actressesRepository: Repository<Actress>,
  ) {}

  findAll(): Promise<Actress[]> {
    return this.actressesRepository.find();
  }

  findOne(id: number): Promise<Actress | null> {
    return this.actressesRepository.findOneBy({ id });
  }

  create(dto: CreateActressDto): Promise<Actress> {
    const actress = this.actressesRepository.create(dto);
    return this.actressesRepository.save(actress);
  }
}
