import { Injectable } from '@nestjs/common';
import { Prisma, Produto } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';
import { CreateProductDto } from '../dtos/Product';


export type ProdutoWithEstoque = Prisma.ProdutoGetPayload<{
  include: { estoque: true };
}>;

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
        imagemExterna:payload.img_externa_url,
        imagemInterna:payload.img_interna_url,
        estoque:{
          create:{
            quantidade:payload.estoque,
            unidade:payload.unidade_medida,
            alertaMinimo:payload.alertar_estoque,
            quantidadeMinima:payload.quantidade_minima_estoque,   
        }
      }
    }});
  }
  async findById(id:string):Promise<ProdutoWithEstoque>{
    return await this.prismaService.produto.findFirst({
      where:{AND:{ativo:true, id:id}},
      include:{
        estoque:true,
        subcategoria:true, 
        categoria:true
      },
      
    })
  }
  async deleteById(id:string):Promise<void>{
     await this.prismaService.produto.update({
      where:{
        id:id
      },
      data:{ativo:false}
    })
  }
  async findAll():Promise<Array<ProdutoWithEstoque>>{
    return await this.prismaService.produto.findMany({
      include:{
        estoque:true,
        categoria:true,
        subcategoria:true
      },
      where:{
        ativo:true
      }
    })
  }

}  