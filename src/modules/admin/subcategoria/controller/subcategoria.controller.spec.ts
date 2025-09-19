import { Test } from '@nestjs/testing';
import SubcategoriaController from './subcategoria.controller';
import FindSubcategoryService from '../services/findsubcategoryById';
import SubcategoriaRepository from '../repository/subcategoria.repository';
import { Subcategoria } from '@prisma/client';
import { subcategoryMock } from '../mocks/subcategoria.mocks';

describe('SubcategoriaController', () => {
  let subcategoriaController: SubcategoriaController;
  let findSubcategoryService: FindSubcategoryService;
  let subcategoriaRepository: SubcategoriaRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [SubcategoriaController],
      providers: [
        FindSubcategoryService,
        {
          provide: SubcategoriaRepository,
          useValue: {
            getAllSubcategoria: jest.fn().mockResolvedValue({subcategoryMock}), 
          },
        },
      ],
    }).compile();

    subcategoriaController = moduleRef.get(SubcategoriaController);
    findSubcategoryService = moduleRef.get(FindSubcategoryService);
    subcategoriaRepository = moduleRef.get(SubcategoriaRepository);
  });


  it('Modulos definidos', ()=>{
    expect(subcategoriaRepository).toBeDefined();
    expect(findSubcategoryService).toBeDefined()
  })

  describe('findAll', () => {
    it('espera retornar um array de subcategoria', async () => {
      const mockResult: Subcategoria[] = [
        { id: '1mofaofpfkd0334', nome: 'Bolsas', categoriaId:  '3wjao034-23481-2wekw' },
      ] as Subcategoria[];

      // Configuramos o repositório mockado
      (subcategoriaRepository.getAllSubcategoria as jest.Mock).mockResolvedValue(mockResult);

      // Chamamos o método do controller
      const response = await subcategoriaController.getAll();

      // Verificamos se o resultado foi o esperado
      expect(response).toEqual(mockResult);

      // Verificamos se o repo foi realmente chamado
      expect(subcategoriaRepository.getAllSubcategoria).toHaveBeenCalled();
    });
  });
});
