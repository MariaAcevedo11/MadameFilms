import { Controller, Get, Param, Body } from '@nestjs/common';
import { Actress } from './entities/actress.entity';
import { ActressesService } from './actresses.service';

@Controller('Actresses')
export class ActressesController {
  constructor(private readonly actressesService: ActressesService) {}

  @Get()
  findAll(): Promise<Actress[]> {
    return this.actressesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Actress | null> {
    return this.actressesService.findOne(Number(id));
  }
}
