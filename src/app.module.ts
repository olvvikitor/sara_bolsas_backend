import { Module } from '@nestjs/common';
import CategoriaModule from './modules/admin/categoria/categoria.module';
import { ConfigModuleAplication } from './config/config.module';

@Module({
  imports: [CategoriaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
