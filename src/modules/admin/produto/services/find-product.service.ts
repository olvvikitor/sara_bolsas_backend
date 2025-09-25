import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import ProductRepository from '../repository/product.repository';
import { Produto } from '@prisma/client';

@Injectable()
export default class FindProductsService{
  constructor (@Inject() private productRepository:ProductRepository) {
  }
  async findproductById(id:string):Promise<Produto>{
    const product = await this.productRepository.findById(id);
    if(!product){
      throw new NotFoundException('Produto não encontrado')
    }
    return product
  }

  async findAll():Promise<Array<Produto>>{
    return await this.productRepository.findAll()
  }
}