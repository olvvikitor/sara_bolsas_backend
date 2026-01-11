import { Module } from '@nestjs/common';
import { ConfigModuleAplication } from 'src/config/config.module';
import SubcategoriaController from './controller/subcategoria.controller';
import SubcategoriaRepository from './repository/subcategoria.repository';
import CreateSubcategoriaService from './services/create-subcategoria.service';
import CategoriaModule from '../categoria/categoria.module';
import FindSubcategoryService from './services/findsubcategoryById';
import UpdateCategoriaService from '../categoria/services/update-categoria.service';

@Module({
  imports: [ConfigModuleAplication, CategoriaModule],
  controllers:[SubcategoriaController],
  providers: [SubcategoriaRepository, CreateSubcategoriaService,FindSubcategoryService, UpdateCategoriaService],
  exports:[CreateSubcategoriaService, FindSubcategoryService,UpdateCategoriaService,SubcategoriaRepository]
})
export default class SubcategoriaModule{
  
}