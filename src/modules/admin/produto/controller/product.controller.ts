import { Body, Controller, Inject, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CreateProductDto } from '../dtos/Product';
import { FilesInterceptor } from '@nestjs/platform-express';
import IStorageProvider from 'src/shared/providers/storage/IStorageProvider';
import CreateProdutoService from '../services/create.produto.service';
import { ModuleRef } from '@nestjs/core';

@Controller('product')
export default class ProductController{
  constructor (@Inject('IStorageProvider') private storageProvider:IStorageProvider,
   private moduleRefs:ModuleRef) {
    
  }

  @Post('newProduct')
  @UseInterceptors(FilesInterceptor('img'))
  async createNewProduct(@UploadedFiles() images : Array<Express.Multer.File>, 
     @Body() createProductDto:CreateProductDto){
      const createProductService:CreateProdutoService = this.moduleRefs.get(CreateProdutoService)
      const urlImages = await Promise.all(images.map( async (img) =>
        await this.storageProvider.upload(img)
      ))
      console.log(urlImages)
  }
}