import { Inject, Injectable } from '@nestjs/common';
import ProductRepository from '../repository/product.repository';
import { CreateProductDto } from '../dtos/Product';
import IStorageProvider from 'src/shared/providers/storage/IStorageProvider';

@Injectable()
export default class CreateProdutoService{
  constructor (@Inject() private produtoRepository:ProductRepository,
@Inject('IStorageProvider') storageProvider:IStorageProvider) {
    
  }
  async createNewProduct(payload:CreateProductDto):Promise<void>{

    

    // await this.produtoRepository.createNewProduct(payload)

  }
}