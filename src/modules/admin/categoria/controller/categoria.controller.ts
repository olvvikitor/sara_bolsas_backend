import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CreateCategoriaDto } from '../dtos/create-category-dto';
import CreateCategoriaService from '../services/create-categoria.service';
import { ModuleRef } from '@nestjs/core';


@Controller('categoria')
export default class CategoriaController{

  constructor (private moduleRefs:ModuleRef) {
    
  }

  @Post('new')
  public async createNewCategoria(@Body() createCategoriaDto:CreateCategoriaDto){
    const createCategoriaService : CreateCategoriaService = this.moduleRefs.get(CreateCategoriaService)
    return await createCategoriaService.creatNewCategoria(createCategoriaDto)

  }

}