import { ConflictException, Inject, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { UpdateSubcategoriaDto } from '../dtos/update-subcategoria.dto';
import SubcategoriaRepository from '../repository/subcategoria.repository';
import CategoriaRepository from '../../categoria/repository/categoria.repository';

@Injectable()
export default class UpdateSubcategoriaService {
  constructor(
    @Inject() private subcategoriaRepository: SubcategoriaRepository,
    @Inject() private categoriaRepository: CategoriaRepository,
  ) {}

  async updateSubcategoria(id: string, payload: UpdateSubcategoriaDto): Promise<void> {
      const subcategoria = await this.subcategoriaRepository.getSubcategoriabyId(id);
      if (!subcategoria) {
        throw new NotFoundException('Subcategoria não encontrada');
      }

      // Validar se o novo nome já existe (se foi fornecido)
      if (payload.nome && payload.nome !== subcategoria.nome) {
        const existingSubcategoria = await this.subcategoriaRepository.getSubcategoriabyName(payload.nome);
        if (existingSubcategoria) {
          throw new ConflictException('Já existe uma subcategoria com esse nome');
        }
      }

      // Validar se a categoria existe (se foi fornecida)
      if (payload.categoriaId && payload.categoriaId !== subcategoria.categoriaId) {
        const categoria = await this.categoriaRepository.getGategoryById(payload.categoriaId);
        if (!categoria) {
          throw new NotFoundException('Categoria não encontrada');
        }
      }
      await this.subcategoriaRepository.updateById(id, payload);
    }
  }

