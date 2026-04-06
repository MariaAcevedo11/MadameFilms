import { Module } from '@nestjs/common';
import { Actress } from './entities/actress.entity';
import { ActressesController } from './actresses.controller';
import { ActressesService } from './actresses.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Actress])],
  controllers: [ActressesController],
  providers: [ActressesService],
})
export class ActressesModule {}
