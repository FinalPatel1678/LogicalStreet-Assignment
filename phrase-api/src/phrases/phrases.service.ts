import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Phrase } from './phrase.entity';

@Injectable()
export class PhrasesService {
  constructor(
    @InjectRepository(Phrase)
    private readonly phraseRepository: Repository<Phrase>,
  ) {}

  async findOne(id: number): Promise<Phrase> {
    const phrase = await this.phraseRepository.findOne({ where: { id } });
    if (!phrase) {
      throw new NotFoundException(`Phrase with ID ${id} not found`);
    }
    return phrase;
  }

  async findTranslation(id: number, language: string): Promise<string> {
    const phrase = await this.findOne(id);
    return phrase.translations[language];
  }

  async search(
    query: string,
    sort: string = 'id',
    order: 'ASC' | 'DESC' = 'ASC',
    status?: string,
  ): Promise<Phrase[]> {
    const whereConditions = { phrase: Like(`%${query}%`) };
    if (status) {
      whereConditions['status'] = status;
    }

    return this.phraseRepository.find({
      where: whereConditions,
      order: { [sort]: order },
    });
  }
}
