import { Module } from '@nestjs/common';
import CategoriaRepository from './repository/categoria.repositry';
import CreateCategoriaService from './services/create-categoria.service';
import CategoriaController from './controller/categoria.controller';
import { PrismaService } from 'src/config/prisma.service';
import { ConfigModuleAplication } from 'src/config/config.module';

@Module({
  imports:[ConfigModuleAplication],
  controllers:[CategoriaController],
  providers:[CategoriaRepository, CreateCategoriaService],
  exports:[CreateCategoriaService]
})
export default class CategoriaModule{}