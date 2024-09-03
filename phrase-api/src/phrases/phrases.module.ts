import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhrasesController } from './phrases.controller';
import { PhrasesService } from './phrases.service';
import { Phrase } from './phrase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phrase])],
  controllers: [PhrasesController],
  providers: [PhrasesService],
})
export class PhrasesModule {}
