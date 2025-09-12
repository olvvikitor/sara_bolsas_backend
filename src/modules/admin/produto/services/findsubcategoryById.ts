import { Inject, Injectable } from '@nestjs/common';
import ProductRepository from '../repository/product.repository';
import { CreateProductDto } from '../dtos/Product';
import IStorageProvider from 'src/shared/providers/storage/IStorageProvider';
import SubcategoriaRepository from '../../subcategoria/repository/subcategoria.repository';
import { CreateSubcategoriaDto } from '../../subcategoria/dtos/create_subcategoria.dto';
import { Subcategoria } from '@prisma/client';

@Injectable()
export default class FindSubcategoryService {
  constructor(
    @Inject() private subcategoryRepository: SubcategoriaRepository,
  ) {}
  async findById(id: string): Promise<Subcategoria> {
    return await this.subcategoryRepository.getSubcategoriabyId(id);
  }
}
