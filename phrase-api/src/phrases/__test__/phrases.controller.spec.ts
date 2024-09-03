import { Test, TestingModule } from '@nestjs/testing';
import { PhrasesController } from '../phrases.controller';
import { PhrasesService } from '../phrases.service';
import { NotFoundException } from '@nestjs/common';
import * as request from 'supertest';

describe('PhrasesController', () => {
  let app;
  let service: PhrasesService;

  const mockPhrasesService = {
    search: jest.fn(),
    findOne: jest.fn(),
    findTranslation: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhrasesController],
      providers: [
        {
          provide: PhrasesService,
          useValue: mockPhrasesService,
        },
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    service = module.get<PhrasesService>(PhrasesService);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /phrase/search', () => {
    it('should return a list of phrases based on search query', async () => {
      const phrases = [
        { id: 1, phrase: 'Hello', translations: {}, status: 'active' },
        { id: 2, phrase: 'Hi', translations: {}, status: 'active' },
      ];
      mockPhrasesService.search.mockResolvedValue(phrases);

      return request(app.getHttpServer())
        .get('/phrase/search')
        .query({ query: 'Hello', sort: 'id', order: 'ASC' })
        .expect(200)
        .expect(phrases);
    });
  });

  describe('GET /phrase/:id', () => {
    it('should return a phrase by ID', async () => {
      const phrase = {
        id: 1,
        phrase: 'Hello',
        status: 'active',
      };
      mockPhrasesService.findOne.mockResolvedValue(phrase);

      return request(app.getHttpServer())
        .get('/phrase/1')
        .expect(200)
        .expect(phrase);
    });

    it('should throw a NotFoundException if the phrase is not found', async () => {
      mockPhrasesService.findOne.mockRejectedValue(
        new NotFoundException('Phrase not found'),
      );

      return request(app.getHttpServer()).get('/phrase/1').expect(404).expect({
        statusCode: 404,
        message: 'Phrase not found',
        error: 'Not Found',
      });
    });
  });

  describe('GET /phrase/:id/:language', () => {
    it('should return the translation for a given language', async () => {
      const translation = 'Bonjour';
      mockPhrasesService.findTranslation.mockResolvedValue(translation);

      return request(app.getHttpServer())
        .get('/phrase/1/fr')
        .expect(200)
        .expect({ translation });
    });

    it('should throw a NotFoundException if the translation is not found', async () => {
      mockPhrasesService.findTranslation.mockRejectedValue(
        new NotFoundException('Translation for language fr not found'),
      );

      return request(app.getHttpServer())
        .get('/phrase/1/fr')
        .expect(404)
        .expect({
          message: 'Translation for language fr not found',
          error: 'Not Found',
          statusCode: 404,
        });
    });
  });
});
