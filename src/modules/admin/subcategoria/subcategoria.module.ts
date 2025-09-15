import { Module } from '@nestjs/common';
import { ConfigModuleAplication } from 'src/config/config.module';
import SubcategoriaController from './controller/subcategoria.controller';
import SubcategoriaRepository from './repository/subcategoria.repository';
import CreateSubcategoriaService from './services/create-subcategoria.service';
import CategoriaModule from '../categoria/categoria.module';
import FindCategoriaService from '../categoria/services/get-categoria.service';

@Module({
  imports: [ConfigModuleAplication, CategoriaModule],
  controllers:[SubcategoriaController],
  providers: [SubcategoriaRepository, CreateSubcategoriaService,FindCategoriaService],
  exports:[CreateSubcategoriaService, FindCategoriaService,SubcategoriaRepository]
})
export default class SubcategoriaModule{
  
}