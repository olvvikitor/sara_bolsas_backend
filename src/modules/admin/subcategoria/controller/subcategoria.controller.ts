import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateSubcategoriaDto } from '../dtos/create_subcategoria.dto';
import { ModuleRef } from '@nestjs/core';
import CreateSubcategoriaService from '../services/create-subcategoria.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import FindCategoriaService from '../../categoria/services/get-categoria.service';
import FindSubcategoryService from '../services/findsubcategoryById';

@ApiTags('Subcategorias')
@Controller('subcategoria')
export default class SubcategoriaController {

  constructor(private modulesRefs: ModuleRef) {}

  @Post('new')
  @ApiOperation({ summary: 'Cria uma nova subcategoria' })
  @ApiResponse({ status: 201, description: 'Subcategoria criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos enviados.' })
  @ApiBody({
    type: CreateSubcategoriaDto,
    description: 'Dados para criação de subcategoria. O campo categoriaId deve ser um UUID válido.',
    examples: {
      exemplo: {
        summary: 'Exemplo de subcategoria',
        value: {
          nome: 'Clutch',
          descricao: 'Subcategoria de bolsas pequenas',
          categoriaId: 'a3f1c2e4-5b6d-4e7f-8a9b-123456789abc' // UUID de exemplo
        }
      }
    }
  })
  async createNewSubcategoria(@Body() payload: CreateSubcategoriaDto) {
    const createSubcategoriaService: CreateSubcategoriaService = this.modulesRefs.get(CreateSubcategoriaService);
    return await createSubcategoriaService.createNewSubcategoria(payload);
  }


  @Get('getAll')
  @ApiOperation({summary:'Busca todas as categorias'})
  @ApiResponse({status:200})
  async getAll(){
    const findSubcategoriaService: FindSubcategoryService = this.modulesRefs.get(FindSubcategoryService);
    return await findSubcategoriaService.findAll()
  }

}