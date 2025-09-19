import { Injectable } from '@nestjs/common';
import { Prisma, Subcategoria } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';


@Injectable()
export default class SubcategoriaRepository{
  constructor (private prismaService:PrismaService) {
  }

  public async createSubcategory(payload:Prisma.SubcategoriaUncheckedCreateInput) {
    await this.prismaService.subcategoria.create({
      data:payload
    })
  }
  public async getSubcategoriabyId(id:string):Promise<Subcategoria>{
    return await this.prismaService.subcategoria.findFirst({
      where:{
        id:id
      }
    })
  }
  public async getSubcategoriabyName(name:string):Promise<Subcategoria>{
    return await this.prismaService.subcategoria.findFirst({
      where:{
        nome:name
      }
    })
  }
  public async getAllSubcategoria():Promise<Subcategoria[]>{
    return await this.prismaService.subcategoria.findMany({ include: { categoria: true } })
  }

}