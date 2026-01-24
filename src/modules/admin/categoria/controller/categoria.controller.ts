import { Body, Controller, Delete, Get, Param, Post, Put, UnauthorizedException, UseGuards } from '@nestjs/common';
import { CreateCategoriaDto } from '../dtos/create-category-dto';
import CreateCategoriaService from '../services/create-categoria.service';
import { ModuleRef } from '@nestjs/core';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import FindCategoriaService from '../services/get-categoria.service';
import UpdateCategoriaService from '../services/update-categoria.service';
import ResponseCategoryDto from '../dtos/response-categoria-dto';
import { AdminJwtPayload, AuthGuard } from 'src/shared/providers/auth/AuthGuard';
import { Admin } from '../../decorators/Admin';

@ApiTags('Categorias') // Nome da seção no Swagger UI
@Controller('categoria')
export default class CategoriaController {
  constructor(private moduleRefs: ModuleRef) {}

  @Post('new')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cria uma nova categoria' })
  @ApiResponse({ status: 201, description: 'Categoria criada com sucesso.', type: ResponseCategoryDto })
  @ApiResponse({ status: 400, description: 'Dados inválidos enviados.' })
  @ApiBody({ type: CreateCategoriaDto, description: 'Dados para criação de categoria', examples: {
    exemplo: {
      summary: 'Exemplo de categoria',
      value: { nome: 'Bolsas', descricao: 'Categoria de bolsas femininas' , tipo_categoria: 'FEMININA'}
    }
  }})
  public async createNewCategoria(
   @Admin() admin:AdminJwtPayload, @Body() createCategoriaDto: CreateCategoriaDto) {
    const createCategoriaService: CreateCategoriaService = this.moduleRefs.get(CreateCategoriaService);
    return await createCategoriaService.creatNewCategoria(createCategoriaDto);
  }

  @Get('getById/:id')
  @ApiOperation({ summary: 'Busca por uma categoria por id' })
  @ApiResponse({ status: 200, description: 'Categoria encontrada.', type: ResponseCategoryDto })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  public async getCategoriaById(@Param('id') id: string) {
    const findcategoriaService: FindCategoriaService = this.moduleRefs.get(FindCategoriaService);
    return await findcategoriaService.findCategoriaById(id);
  }

  @Get('getByNome/:nome')
  @ApiOperation({ summary: 'Busca por uma categoria pelo nome' })
  @ApiResponse({ status: 200, description: 'Categoria encontrada.', type: ResponseCategoryDto })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  public async getAllCategoria(@Param('nome') nome: string) {
    const findcategoriaService: FindCategoriaService = this.moduleRefs.get(FindCategoriaService);
    return await findcategoriaService.findCategoriaByName(nome);
  }
  @Get('getAll')
  @ApiOperation({ summary: 'Busca por todas as categoria' })
  @ApiResponse({ status: 200, description: 'Categoria encontrada.', type: Array<ResponseCategoryDto> })
  public async getCategoriaByNome() {
    const findcategoriaService: FindCategoriaService = this.moduleRefs.get(FindCategoriaService);
    return await findcategoriaService.findAllCategoria();
  }

  @Put('update/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualiza uma categoria pelo id' })
  @ApiResponse({ status: 200, description: 'Categoria atualizada com sucesso.', type: ResponseCategoryDto })
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  @ApiResponse({ status: 409, description: 'Categoria já existente.' })
  @ApiBody({ type: CreateCategoriaDto, description: 'Dados para atualização da categoria', examples: {
    exemplo: {
      summary: 'Exemplo de atualização',
      value: { nome: 'Bolsas Atualizadas', descricao: 'Nova descrição' }
    }
  }})

  public async updateById(@Admin() admin:AdminJwtPayload,@Param('id') id: string, @Body() payload: CreateCategoriaDto) {
    const updateCategoriaService: UpdateCategoriaService = this.moduleRefs.get(UpdateCategoriaService);
    return await updateCategoriaService.updateCategoriaById(id, payload);
  }

  @Delete('delete/:id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deleta uma categoria pelo id' })
  @ApiResponse({ status: 201, description: 'Categoria deletada com sucesso.'})
  @ApiResponse({ status: 404, description: 'Categoria não encontrada.' })
  public async deleteById(@Admin() admin:AdminJwtPayload,@Param('id') id: string) {
    const updateCategoriaService: UpdateCategoriaService = this.moduleRefs.get(UpdateCategoriaService);
    return await updateCategoriaService.deleteCategoriaById(id);
  }
   
}
