import { Inject, Injectable } from '@nestjs/common';
import SubcategoriaRepository from '../repository/subcategoria.repository';
import { Subcategoria } from '@prisma/client';

@Injectable()
export default class FindSubcategoryService {
  constructor(
    @Inject() private subcategoryRepository: SubcategoriaRepository,
  ) {}
  async findById(id: string): Promise<Subcategoria> {
    return await this.subcategoryRepository.getSubcategoriabyId(id);
  }
  async findAll():Promise<Subcategoria[]>{
    return await this.subcategoryRepository.getAllSubcategoria()
  }
}
