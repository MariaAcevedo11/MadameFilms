// Author: Gabriela Sanabria

// External imports
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

// Internal imports
import { Actress } from './entities/actress.entity';
import { ActressesService } from './actresses.service';
import { CreateActressDto } from './dto/create-actress.dto';

@Controller('actresses')
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

  @Post()
  create(@Body() dto: CreateActressDto) {
    return this.actressesService.create(dto);
  }
}
