import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import CategoriaRepository from '../repository/categoria.repository';
import { Categoria } from '@prisma/client';

@Injectable()
export default class FindCategoriaService {
  constructor(@Inject() private categoriaRepository: CategoriaRepository) {

  }

  public async findCategoriaById(id: string): Promise<Categoria> {

    const categoriaExist = await this.categoriaRepository.getGategoryById(id)

    if (!categoriaExist) {
      throw new NotFoundException('não existe uma categoria com esse id')
    }
    return await this.categoriaRepository.getGategoryById(id)

  }

  public async findCategoriaByName(name: string): Promise<Categoria> {

    const categoriaExist = await this.categoriaRepository.getGategoryByName(name)

    if (!categoriaExist) {
      throw new NotFoundException('não existe uma categoria com esse id')
    }
    return await this.categoriaRepository.getGategoryByName(name)

  }

  public async findAllCategoria():Promise<Categoria[]>{
    return this.categoriaRepository.getAllCategorias()
  }



}