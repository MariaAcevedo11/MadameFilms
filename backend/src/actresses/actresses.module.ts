// External imports
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

// Internal imports
import { Actress } from './entities/actress.entity';
import { ActressesController } from './actresses.controller';
import { ActressesService } from './actresses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Actress])],
  controllers: [ActressesController],
  providers: [ActressesService],
})
export class ActressesModule {}
