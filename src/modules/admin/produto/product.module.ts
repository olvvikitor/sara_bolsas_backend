import { Module } from '@nestjs/common';
import ProductController from './controller/product.controller';
import { StorageModule } from 'src/shared/providers/storage/Storage.module';
import CreateProdutoService from './services/create.produto.service';
import ProductRepository from './repository/product.repository';
import { ConfigModuleAplication } from 'src/config/config.module';
import SubcategoriaModule from '../subcategoria/subcategoria.module';
import CategoriaModule from '../categoria/categoria.module';

@Module({
  imports:[ConfigModuleAplication,StorageModule,SubcategoriaModule, CategoriaModule],
  controllers:[ProductController],
  providers:[CreateProdutoService, ProductRepository]
})
export default class ProductModule{}