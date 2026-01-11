import { ConflictException, Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/config/prisma.service';
import { CreateSubcategoriaDto } from '../dtos/create_subcategoria.dto';
import SubcategoriaRepository from '../repository/subcategoria.repository';
import CategoriaRepository from '../../categoria/repository/categoria.repository';


@Injectable()
export default class CreateSubcategoriaService {
  constructor(
    @Inject() private subcategoriaRepository: SubcategoriaRepository,
    @Inject() private categoriaRepository: CategoriaRepository,
  ) {}
  
  async createNewSubcategoria(payload: CreateSubcategoriaDto): Promise<void> {
    try {
      // Validar se a subcategoria já existe
      const subcategoria = await this.subcategoriaRepository.getSubcategoriabyName(payload.nome);
      if (subcategoria) {
        throw new ConflictException('Já existe uma subcategoria com esse mesmo nome');
      }

      // Validar se a categoria existe
      const categoria = await this.categoriaRepository.getGategoryById(payload.categoriaId);
      if (!categoria) {
        throw new NotFoundException('Não foi encontrada uma categoria com esse id');
      }

      await this.subcategoriaRepository.createSubcategory(payload);
    } catch (error) {
      if (error instanceof ConflictException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao criar subcategoria');
    }
  }

  async deleteSubCategoriaById(id: string): Promise<void> {
    try {
      if (!id || id.trim() === '') {
        throw new BadRequestException('ID inválido');
      }

      const subcategoria = await this.subcategoriaRepository.getSubcategoriabyId(id);
      if (!subcategoria) {
        throw new NotFoundException('Subcategoria não encontrada');
      }

      await this.subcategoriaRepository.deleteById(id);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Erro ao deletar subcategoria');
    }
  }
}
