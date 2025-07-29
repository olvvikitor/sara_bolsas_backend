import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import CategoriaRepository from '../repository/categoria.repository';
import { CreateCategoriaDto } from '../dtos/create-category-dto';

@Injectable()
export default class UpdateCategoriaService {
  constructor(@Inject() private categoriaRepository: CategoriaRepository) {}

  public async updateCategoriaById(
    id: string,
    payload: CreateCategoriaDto,
  ): Promise<void> {
    const categoria = await this.categoriaRepository.getGategoryById(id);
    if (!categoria) {
      throw new NotFoundException('categoria não encontrada');
    }
    const categoriaByName = await this.categoriaRepository.getGategoryByName(
      payload.nome,
    );
    if (categoriaByName) {
      throw new ConflictException('Já existe uma categoria com esse nome');
    }
    await this.categoriaRepository.updateCategoria(id, payload);
  }
  public async deleteCategoriaById(id: string): Promise<void> {
    const categoria = await this.categoriaRepository.getGategoryById(id);
    if (!categoria) {
      throw new NotFoundException('categoria não encontrada');
    }
    await this.categoriaRepository.deleteGategoryById(id)
  }
}
