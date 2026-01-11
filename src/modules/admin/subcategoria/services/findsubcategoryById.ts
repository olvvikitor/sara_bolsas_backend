import { Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import SubcategoriaRepository from '../repository/subcategoria.repository';
import { Subcategoria } from '@prisma/client';

@Injectable()
export default class FindSubcategoryService {
  constructor(
    @Inject() private subcategoryRepository: SubcategoriaRepository,
  ) {}

  async findById(id: string): Promise<Subcategoria> {
    try {
      if (!id || id.trim() === '') {
        throw new BadRequestException('ID inválido');
      }

      const subcategoria = await this.subcategoryRepository.getSubcategoriabyId(id);
      
      if (!subcategoria) {
        throw new NotFoundException('Subcategoria não encontrada');
      }

      return subcategoria;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Erro ao buscar subcategoria');
    }
  }

  async findAll(): Promise<Subcategoria[]> {
    try {
      return await this.subcategoryRepository.getAllSubcategoria();
    } catch (error) {
      throw new BadRequestException('Erro ao buscar subcategorias');
    }
  }
}
