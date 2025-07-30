import { Module } from '@nestjs/common';
import CategoriaModule from './modules/admin/categoria/categoria.module';
import { ConfigModuleAplication } from './config/config.module';
import SubcategoriaModule from './modules/admin/subcategoria/subcategoria.module';

@Module({
  imports: [CategoriaModule, SubcategoriaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
