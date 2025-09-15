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
        altura: payload.altura,
        descricao:payload.descricao,
        emPromocao: payload.emPromocao,
        largura:payload.largura,
        nome:payload.nome,
        preco:payload.preco,
        subcategoriaId:payload.id_subcategoria,
        categoriaId:payload.id_categoria,
        precoPromocional:payload.precoPromocional,
        imagemExterna:payload.img
      }
    })
  }
}  