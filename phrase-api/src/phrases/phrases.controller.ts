import {
  Controller,
  Get,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { PhrasesService } from './phrases.service';

@Controller('phrase')
export class PhrasesController {
  constructor(private readonly phrasesService: PhrasesService) {}

  @Get('search')
  async searchPhrases(
    @Query('query') query: string,
    @Query('sort') sort: string = 'id',
    @Query('order') order: 'ASC' | 'DESC' = 'ASC',
    @Query('status') status?: string, // Optional filter by status
  ) {
    return this.phrasesService.search(query, sort, order, status);
  }

  @Get(':id')
  async getPhrase(@Param('id') id: number) {
    const phrase = await this.phrasesService.findOne(id);
    const { translations, ...result } = phrase;
    return result;
  }

  @Get(':id/:language')
  async getTranslation(
    @Param('id') id: number,
    @Param('language') language: string,
  ) {
    const translation = await this.phrasesService.findTranslation(id, language);
    if (!translation) {
      throw new NotFoundException(
        `Translation for language ${language} not found`,
      );
    }
    return { translation };
  }
}
