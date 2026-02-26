import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  Req,
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
import { Request } from 'express';
import { DeleteProductService } from '../services/delete-produto.service';
import UpdateProductService from '../services/UpdateProductService';
import { UpdadeProductDto } from '../dtos/Update';

@ApiTags('Products')
@Controller('product')
export default class ProductController {
  constructor(
    @Inject('IStorageProvider')
    private storageProvider: IStorageProvider,
    private moduleRefs: ModuleRef,
  ) { }

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
    @Admin() admin: AdminJwtPayload,
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


  @ApiOperation({ summary: 'Busca por todos os produtos' })
  @ApiResponse({ status: 200, description: 'Produto encontrado com sucesso' })
  @ApiBearerAuth()
  @Get('all')
  @UseGuards(AuthGuard)
  async findAll(@Req() request: Request) {
    const findProductService: FindProductsService = this.moduleRefs.get(FindProductsService)
    const products = await findProductService.findAll()
    if (
      request.userData == null || request.userData.type != 'ADMIN'
    ) {
      products.forEach(product => {
        delete product.estoque
      })
    }
    return products
  }


  @ApiOperation({ summary: 'Busca por um produto com base no seu id' })
  @ApiResponse({ status: 200, description: 'Produto encontrado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @Get(':/id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  async findById(@Req() request: Request, @Param('id') id: string) {
    const findProductService: FindProductsService = this.moduleRefs.get(FindProductsService)
    const product = await findProductService.findproductById(id)
    if (
      request.userData == null || request.userData.type != 'ADMIN'
    ) {
      delete product.estoque
    }
    return product

  }

  @ApiOperation({ summary: 'Altera o status de produto para inativo no seu id' })
  @ApiResponse({ status: 200, description: 'Produto alterado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put('inat/:id')
  async deleteById(@Param('id') id: string) {
    const deleteProduct: DeleteProductService = this.moduleRefs.get(DeleteProductService)
    await deleteProduct.delete(id)
  }

  @ApiOperation({ summary: 'Update de produto com base no seu id' })
  @ApiResponse({ status: 200, description: 'Produto alterado com sucesso' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado' })
  @ApiResponse({ status: 400, description: 'Payload incorreto' })
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdadeProductDto,
  })
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: 'img_interna_nova',
          maxCount: 1,
        },
        {
          name: 'img_externa_nova',
          maxCount: 3,
        },
      ],
      { storage: memoryStorage() },
    ),
  )
  @Put('update/:id')
  async updateById(@Param('id') id: string, @Admin() admin: AdminJwtPayload,
    @UploadedFiles()
    files: {
      img_externa_nova?: Express.Multer.File[];
      img_interna_nova?: Express.Multer.File[];
    }, @Body() payload: UpdadeProductDto) {
    const updateProduct: UpdateProductService = this.moduleRefs.get(UpdateProductService)


    if (files.img_externa_nova) {
      const urlImages = await Promise.all(
        files.img_externa_nova.map(
          async (img) => await this.storageProvider.upload(img),
        ),
      );
      payload.img_externa_url = urlImages
    }

    if (files.img_interna_nova) {
      const urlImages = await Promise.all(
        files.img_interna_nova.map(
          async (img) => await this.storageProvider.upload(img),
        ),
      );
      payload.img_interna_url = urlImages
    }



      return await updateProduct.updateProduct(id, payload)
    }
  }

