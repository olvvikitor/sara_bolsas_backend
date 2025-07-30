import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
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
    const subcategoria =
      await this.subcategoriaRepository.getSubcategoriabyName(payload.nome);
    if (subcategoria) {
      throw new ConflictException(
        'Já existe uma subcategoria com esse mesmo nome',
      );
    }
    const categoria = await this.categoriaRepository.getGategoryById(payload.categoriaId)
    if(!categoria){
      throw new NotFoundException('Não foi encontrada uma categoria com esse id')
    }

    await this.subcategoriaRepository.createSubcategory(payload);
  }
}
