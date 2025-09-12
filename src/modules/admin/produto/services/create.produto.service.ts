import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import ProductRepository from '../repository/product.repository';
import { CreateProductDto } from '../dtos/Product';
import IStorageProvider from 'src/shared/providers/storage/IStorageProvider';
import SubcategoriaRepository from '../../subcategoria/repository/subcategoria.repository';
import FindCategoriaService from '../../categoria/services/get-categoria.service';

@Injectable()
export default class CreateProdutoService{
  constructor (@Inject() private produtoRepository:ProductRepository,
  @Inject() private subcategoryService:FindCategoriaService) {
    
  }
  async createNewProduct(payload:CreateProductDto):Promise<void>{
    const subcategoria = await this.subcategoryService.findCategoriaById(payload.id_subcategoria);
    if (!subcategoria) {
      throw new NotFoundException('Subcategoria não encontrada');
    }
    await this.produtoRepository.createNewProduct(payload);
  }
}