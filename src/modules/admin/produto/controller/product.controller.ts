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
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FilesInterceptor('image', 2, { storage: memoryStorage() }))
  async createNewProduct(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'png',
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        }),
    )
    img: Array<Express.Multer.File> | undefined,
    @Body() data: CreateProductDto,
  ): Promise<void> {
    const createProductService: CreateProdutoService =
      this.moduleRefs.get(CreateProdutoService);

    if (img) {
      const urlImages = await Promise.all(
        img.map(async (img) => await this.storageProvider.upload(img)),
      );
      data.img = urlImages;
    }

    return createProductService.createNewProduct(data);
  }
}
