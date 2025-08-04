import { Module } from '@nestjs/common';
import CategoriaModule from './modules/admin/categoria/categoria.module';
import { ConfigModuleAplication } from './config/config.module';
import SubcategoriaModule from './modules/admin/subcategoria/subcategoria.module';
import ProductModule from './modules/admin/produto/product.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    CategoriaModule, SubcategoriaModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
