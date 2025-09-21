import { Test } from '@nestjs/testing';
import FindSubcategoryService from '../services/findsubcategoryById';
import SubcategoriaRepository from '../repository/subcategoria.repository';
import { Subcategoria } from '@prisma/client';
import { subcategoryMock } from '../mocks/subcategoria.mocks';
import CreateSubcategoriaService from '../services/create-subcategoria.service';
import { categoriaMock } from '../../categoria/mocks/categoria.mock';
import CategoriaRepository from '../../categoria/repository/categoria.repository';
import { ConflictException, NotFoundException } from '@nestjs/common';
import FindCategoriaService from '../../categoria/services/get-categoria.service';

describe('CreateSubcategoryService', () => {

  let findSubcategoryService: FindSubcategoryService;
  let createSubcategoriaService: CreateSubcategoriaService;
  let subcategoriaRepository: SubcategoriaRepository;
  let getGategoryByIdService:FindCategoriaService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CreateSubcategoriaService,
        {
          provide: SubcategoriaRepository,
          useValue: {
            createSubcategory: jest
              .fn()
              .mockResolvedValue({ subcategoryMock }),
            createSubcategoriaService: jest
              .fn()
              .mockResolvedValue({subcategoryMock}),
            getSubcategoriabyName :jest
            .fn()
            .mockResolvedValue({subcategoryMock}),
            getSubcategoriabyId :jest
            .fn()
            .mockResolvedValue({subcategoryMock}),
            getAllSubcategoria:jest
            .fn().mockResolvedValue({subcategoryMock})
          },
        },
        {
          provide: CategoriaRepository,
          useValue: {
            getGategoryById: jest.fn().mockResolvedValue({ categoriaMock }),
          },
        },
      ],
    }).compile();

    findSubcategoryService = moduleRef.get(FindSubcategoryService);
    createSubcategoriaService = moduleRef.get(CreateSubcategoriaService);
    subcategoriaRepository = moduleRef.get(SubcategoriaRepository);
    getGategoryByIdService = moduleRef.get(FindCategoriaService)
  });

  it('Modulos definidos', () => {
    expect(subcategoriaRepository).toBeDefined();
    expect(findSubcategoryService).toBeDefined();
    expect(createSubcategoriaService).toBeDefined();
    
  });


  describe('createNewSubcategoria', () => {
    it('espera erro na criação de uma nova subcategoria pois já existe uma com o mesmo nome', async () => {
      // Mock da categoria que já existe
      categoriaMock;

      const dto = { nome: 'Clutch', categoriaId: categoriaMock.id };

      (subcategoriaRepository.getSubcategoriabyName as jest.Mock).mockResolvedValue(subcategoryMock)

      await expect (createSubcategoriaService.createNewSubcategoria(dto))
      .rejects
      .toThrow(ConflictException)
    });
  });
  
  describe('createNewSubcategoria', () => {
    it('espera erro na criação de uma nova subcategoria pois não existe uma categoria com esse id', async () => {
      // Mock da categoria que já existe
      categoriaMock;

      const dto = { nome: 'Clutch', categoriaId: 'id-nao-existente' };

      (subcategoriaRepository.getSubcategoriabyId as jest.Mock).mockResolvedValue(subcategoryMock)

      await expect (createSubcategoriaService.createNewSubcategoria(dto))
      .rejects
      .toThrow(NotFoundException)
    });
  });

});
