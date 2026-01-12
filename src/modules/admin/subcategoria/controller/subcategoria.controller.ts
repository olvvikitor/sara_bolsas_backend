import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { CreateSubcategoriaDto } from '../dtos/create_subcategoria.dto';
import { UpdateSubcategoriaDto } from '../dtos/update-subcategoria.dto';
import { ModuleRef } from '@nestjs/core';
import CreateSubcategoriaService from '../services/create-subcategoria.service';
import UpdateSubcategoriaService from '../services/update-subcategoria.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import FindSubcategoryService from '../services/findsubcategoryById';
import { AdminJwtPayload, AuthGuard } from 'src/shared/providers/auth/AuthGuard';
import { Admin } from '../../decorators/Admin';
import { NotFoundException, ConflictException } from '@nestjs/common';

@ApiTags('Subcategorias')
@Controller('subcategoria')
export default class SubcategoriaController {

  constructor(private updateCategorySerivice:UpdateSubcategoriaService,
     private createSubCategoryService:CreateSubcategoriaService,
     private findCategoryServicee:FindSubcategoryService) { }

  @Post('new')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria uma nova subcategoria' })
  @ApiResponse({ status: 201, description: 'Subcategoria criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos enviados.' })
  @ApiResponse({ status: 409, description: 'Subcategoria com este nome já existe.' })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  @ApiBody({
    type: CreateSubcategoriaDto,
    description: 'Dados para criação de subcategoria. O campo categoriaId deve ser um UUID válido.',
    examples: {
      exemplo: {
        summary: 'Exemplo de subcategoria',
        value: {
          nome: 'Clutch',
          descricao: 'Subcategoria de bolsas pequenas',
          categoriaId: 'a3f1c2e4-5b6d-4e7f-8a9b-123456789abc'
        }
      }
    }
  })
  async createNewSubcategoria(@Admin() admin: AdminJwtPayload, @Body() payload: CreateSubcategoriaDto) {
    try {
      return await this.createSubCategoryService.createNewSubcategoria(payload);
    } catch (error) {
      if (error instanceof ConflictException || error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException('Erro ao criar subcategoria');
    }
  }

  @Get('getAll')
  @ApiOperation({ summary: 'Busca todas as subcategorias' })
  @ApiResponse({ status: 200, description: 'Lista de subcategorias retornada com sucesso.' })
  @ApiResponse({ status: 500, description: 'Erro ao buscar subcategorias.' })
  async getAll() {
    return await this.findCategoryServicee.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca uma subcategoria por ID' })
  @ApiParam({ name: 'id', description: 'ID da subcategoria', example: 'a3f1c2e4-5b6d-4e7f-8a9b-123456789abc' })
  @ApiResponse({ status: 200, description: 'Subcategoria encontrada.' })
  @ApiResponse({ status: 404, description: 'Subcategoria não encontrada.' })
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  async getSubcategoriaById(@Param('id') id: string) {
    if (!id || id.trim() === '') {
      throw new BadRequestException('ID inválido');
    }
    const subcategoria = await this.findCategoryServicee.findById(id);
    if (!subcategoria) {
      throw new NotFoundException('Subcategoria não encontrada');
    }
    return subcategoria;
  }


  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza uma subcategoria' })
  @ApiParam({ name: 'id', description: 'ID da subcategoria', example: 'a3f1c2e4-5b6d-4e7f-8a9b-123456789abc' })
  @ApiResponse({ status: 200, description: 'Subcategoria atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Subcategoria não encontrada.' })
  @ApiResponse({ status: 409, description: 'Subcategoria com este nome já existe.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  @ApiBody({
    type: UpdateSubcategoriaDto,
    description: 'Dados para atualização de subcategoria (todos os campos são opcionais).',
    examples: {
      exemplo: {
        summary: 'Exemplo de atualização',
        value: {
          nome: 'Novo Nome',
          descricao: 'Nova descrição',
          categoriaId: 'a3f1c2e4-5b6d-4e7f-8a9b-123456789abc'
        }
      }
    }
  })
  async updateSubcategoria(
    @Admin() admin: AdminJwtPayload,
    @Param('id') id: string,
    @Body() payload: UpdateSubcategoriaDto
  ) {
    if (!id || id.trim() === '') {
      throw new BadRequestException('ID inválido');
    }
    if (!payload || Object.keys(payload).length === 0) {
      throw new BadRequestException('Pelo menos um campo deve ser fornecido para atualização');
    }
    return await this.updateCategorySerivice.updateSubcategoria(id, payload);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Deleta uma subcategoria' })
  @ApiParam({ name: 'id', description: 'ID da subcategoria', example: 'a3f1c2e4-5b6d-4e7f-8a9b-123456789abc' })
  @ApiResponse({ status: 204, description: 'Subcategoria deletada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Subcategoria não encontrada.' })
  @ApiResponse({ status: 400, description: 'ID inválido.' })
  @ApiResponse({ status: 422, description: 'Essa subcategoria está sendo referenciada a um ou mais produtos.'})
  async deleteSubCategoriaById(@Admin() admin: AdminJwtPayload, @Param('id') id: string) {
    await this.createSubCategoryService.deleteSubCategoriaById(id);

  }
}