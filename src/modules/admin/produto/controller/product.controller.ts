import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from '../dtos/Product';
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import IStorageProvider from 'src/shared/providers/storage/IStorageProvider';
import CreateProdutoService from '../services/create.produto.service';
import { ModuleRef } from '@nestjs/core';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import FindProductsService from '../services/find-product.service';
import { AdminJwtPayload, AuthGuard } from 'src/shared/providers/auth/AuthGuard';
import { Admin } from '../../decorators/Admin';

@ApiTags('Products')
@Controller('product')
export default class ProductController {
  constructor(
    @Inject('IStorageProvider')
    private storageProvider: IStorageProvider,
    private moduleRefs: ModuleRef,
  ) {}

  @Post('newProduct')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateProductDto,
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'img_interna',
          maxCount: 1,
        },
        {
          name: 'img_externa',
          maxCount: 3,
        },
      ],
      { storage: memoryStorage() },
    ),
  )
  async createNewProduct(
    @Admin() admin:AdminJwtPayload,
    @UploadedFiles()
    files: {
      img_interna?: Express.Multer.File[];
      img_externa?: Express.Multer.File[];
    },
    @Body() data: CreateProductDto,
  ): Promise<void> {
    const createProductService: CreateProdutoService =
      this.moduleRefs.get(CreateProdutoService);

    if (files.img_externa) {
      const urlImages = await Promise.all(
        files.img_externa.map(
          async (img) => await this.storageProvider.upload(img),
        ),
      );
      data.img_externa_url = urlImages;
    }

    if (files.img_interna) {
      const urlImages = await Promise.all(
        files.img_interna.map(
          async (img) => await this.storageProvider.upload(img),
        ),
      );
      data.img_interna_url = urlImages
    }


    return createProductService.createNewProduct(data);
  }
  @ApiOperation({summary:'Busca por todos os produtos'})
  @ApiResponse({status:200, description:'Produto encontrado com sucesso'})
  @Get('all')
  async findAll(){
    const findProductService:FindProductsService = this.moduleRefs.get(FindProductsService)
    return findProductService.findAll()
  }


  @ApiOperation({summary:'Busca por um produto com base no seu id'})
  @ApiResponse({status:200, description:'Produto encontrado com sucesso'})
  @ApiResponse({status:404, description:'Produto não encontrado'})
  @Get('product:/id')
  async findById(@Param('id') id:string){
    const findProductService:FindProductsService = this.moduleRefs.get(FindProductsService)
    return findProductService.findproductById(id)
  }
}
