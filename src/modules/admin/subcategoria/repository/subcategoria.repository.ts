import { Injectable } from '@nestjs/common';
import { Prisma, Subcategoria } from '@prisma/client';
import { PrismaService } from 'src/config/prisma.service';


export type SubcategoriaWithProduct = Prisma.SubcategoriaGetPayload<{
  include:{
    produtos:true,
    categoria:true
  }
}>

@Injectable()
export default class SubcategoriaRepository{
  constructor (private prismaService:PrismaService) {
  }

  public async createSubcategory(payload:Prisma.SubcategoriaUncheckedCreateInput) {
    await this.prismaService.subcategoria.create({
      data:payload
    })
  }
  public async getSubcategoriabyId(id:string):Promise<SubcategoriaWithProduct>{
    return await this.prismaService.subcategoria.findFirst({
      where:{
        id:id
      },
      include:{
        produtos:true,
        categoria:true
      }
    })
  }
  public async deleteById(id:string):Promise<Subcategoria>{
    return await this.prismaService.subcategoria.delete({
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
  public async getAllSubcategoria():Promise<Array<SubcategoriaWithProduct>>{
    return await this.prismaService.subcategoria.findMany({ include: { produtos: true,categoria:true

     } })
  }

  public async updateById(id: string, payload: Prisma.SubcategoriaUncheckedUpdateInput): Promise<Subcategoria> {
    return await this.prismaService.subcategoria.update({
      where: { id },
      data: {
        nome:payload.nome
      },
      include: { categoria: true }
    })
  }

}