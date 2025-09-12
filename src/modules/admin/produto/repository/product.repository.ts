import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { CreateProductDto } from '../dtos/Product';

@Injectable()
export default class ProductRepository{
  constructor (private prismaService:PrismaService) {
    
  }
  async createNewProduct(payload:CreateProductDto):Promise<void>{
    await this.prismaService.produto.create({
      data:{
        altura:payload.altura,
        descricao:payload.descricao,
        emPromocao:payload.emPromocao,
        largura:payload.largura,
        nome:payload.nome,
        imagemInterna:payload.images,
        preco:payload.preco,
        precoPromocional:payload.precoPromocional,
        subcategoriaId:payload.id_subcategoria,
      }
    })
  }
}  