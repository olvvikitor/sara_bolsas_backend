import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';

@Injectable()
export default class ProductRepository{
  constructor (private prismaService:PrismaService) {
    
  }
  async createNewProduct(payload:Prisma.ProdutoUncheckedCreateInput):Promise<void>{
    await this.prismaService.produto.create({
      data:payload
    })
  }
}  