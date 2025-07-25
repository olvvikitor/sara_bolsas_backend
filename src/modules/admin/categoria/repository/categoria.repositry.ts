import { Inject, Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
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

}