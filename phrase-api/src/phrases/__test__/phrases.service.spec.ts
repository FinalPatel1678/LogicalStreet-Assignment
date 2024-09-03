import { Test, TestingModule } from '@nestjs/testing';
import { PhrasesService } from '../phrases.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Phrase } from '../phrase.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('PhrasesService', () => {
  let service: PhrasesService;
  let repository: Repository<Phrase>;

  const mockPhraseRepository = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PhrasesService,
        {
          provide: getRepositoryToken(Phrase),
          useValue: mockPhraseRepository,
        },
      ],
    }).compile();

    service = module.get<PhrasesService>(PhrasesService);
    repository = module.get<Repository<Phrase>>(getRepositoryToken(Phrase));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a phrase if found', async () => {
      const phrase = {
        id: 1,
        phrase: 'Hello',
        translations: {},
        status: 'active',
      };
      mockPhraseRepository.findOne.mockResolvedValue(phrase);

      const result = await service.findOne(1);
      expect(result).toEqual(phrase);
      expect(mockPhraseRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should throw a NotFoundException if the phrase is not found', async () => {
      mockPhraseRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findTranslation', () => {
    it('should return the translation if found', async () => {
      const phrase = {
        id: 1,
        phrase: 'Hello',
        translations: { fr: 'Bonjour' },
        status: 'active',
      };
      mockPhraseRepository.findOne.mockResolvedValue(phrase);

      const result = await service.findTranslation(1, 'fr');
      expect(result).toBe('Bonjour');
    });

    it('should throw a NotFoundException if the phrase is not found', async () => {
      mockPhraseRepository.findOne.mockResolvedValue(null);

      await expect(service.findTranslation(1, 'fr')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('search', () => {
    it('should return a list of phrases based on the search query', async () => {
      const phrases = [
        { id: 1, phrase: 'Hello', translations: {}, status: 'active' },
        { id: 2, phrase: 'Hi', translations: {}, status: 'active' },
      ];
      mockPhraseRepository.find.mockResolvedValue(phrases);

      const result = await service.search('Hello');
      expect(result).toEqual(phrases);
      expect(mockPhraseRepository.find).toHaveBeenCalledWith({
        where: { phrase: expect.any(Object) },
        order: { id: 'ASC' },
      });
    });

    it('should filter by status if provided', async () => {
      const phrases = [
        { id: 1, phrase: 'Hello', translations: {}, status: 'active' },
      ];
      mockPhraseRepository.find.mockResolvedValue(phrases);

      const result = await service.search('Hello', 'id', 'ASC', 'active');
      expect(result).toEqual(phrases);
      expect(mockPhraseRepository.find).toHaveBeenCalledWith({
        where: { phrase: expect.any(Object), status: 'active' },
        order: { id: 'ASC' },
      });
    });
  });
});
