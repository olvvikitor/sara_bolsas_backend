import { Module } from '@nestjs/common';
import CategoriaRepository from './repository/categoria.repository';
import CreateCategoriaService from './services/create-categoria.service';
import CategoriaController from './controller/categoria.controller';
import { PrismaService } from 'src/config/prisma.service';
import { ConfigModuleAplication } from 'src/config/config.module';
import FindCategoriaService from './services/get-categoria.service';
import UpdateCategoriaService from './services/update-categoria.service';

@Module({
  imports:[ConfigModuleAplication],
  controllers:[CategoriaController],
  providers:[CategoriaRepository, CreateCategoriaService,FindCategoriaService,UpdateCategoriaService],
  exports:[CategoriaRepository,CreateCategoriaService,FindCategoriaService,UpdateCategoriaService]
})
export default class CategoriaModule{}