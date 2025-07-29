import { Inject, Injectable } from '@nestjs/common';
import { Categoria, Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';


@Injectable()
export default class CategoriaRepository{
  constructor (private prismaService: PrismaService) {
  }

  public async createCategoria(newCategoria: Prisma.CategoriaCreateInput){
    await this.prismaService.categoria.create({
      data:newCategoria
    })
  }

  public async getAllCategorias():Promise<Categoria[]>{
    return await this.prismaService.categoria.findMany()
  }

  public async updateCategoria(id:string, payload:Prisma.CategoriaUpdateInput):Promise<void>{
    await this.prismaService.categoria.update({
      data: payload,
      where: {id:id}
    })
  }

  public async getGategoryById(id:string):Promise<Categoria>{
    return await this.prismaService.categoria.findFirst({where:{
      id:id
    }})
  }
  public async deleteGategoryById(id:string):Promise<void>{
     await this.prismaService.categoria.delete({where:{
      id:id
    }})
  }
  public async getGategoryByName(name:string):Promise<Categoria>{
    return await this.prismaService.categoria.findFirst({where:{
      nome:name
    }})
  }


}