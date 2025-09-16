import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { CreateProductDto } from '../dtos/Product';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import IStorageProvider from 'src/shared/providers/storage/IStorageProvider';
import CreateProdutoService from '../services/create.produto.service';
import { ModuleRef } from '@nestjs/core';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { memoryStorage } from 'multer';

@ApiTags('Products')
@Controller('product')
export default class ProductController {
  constructor(
    @Inject('IStorageProvider')
    private storageProvider: IStorageProvider,
    private moduleRefs: ModuleRef,
  ) {}

  @Post('newProduct')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateProductDto,
  })
  @UseInterceptors(FileFieldsInterceptor([
    {
      name:'img_interna',
      maxCount:1
    },
    {
      name:'img_externa',
      maxCount:3
    }
  ], { storage: memoryStorage() }))
  async createNewProduct(
    @UploadedFiles(
    )
    files:{
      img_interna?: Express.Multer.File[],
      img_externa?: Express.Multer.File[],
    } ,
    @Body() data: CreateProductDto,
  ): Promise<void> {
    const createProductService: CreateProdutoService =
    this.moduleRefs.get(CreateProdutoService);

    if (files.img_externa) {
      const urlImages = await Promise.all(
        files.img_externa.map(async (img) => await this.storageProvider.upload(img)),
      );
      data.img_externa_url = urlImages;
    }

    if (files.img_interna) {
      const urlImages = await Promise.all(
        files.img_interna.map(async (img) => await this.storageProvider.upload(img)),
      );
      data.img_interna_url = urlImages;
    }

    return createProductService.createNewProduct(data);
  }
}
