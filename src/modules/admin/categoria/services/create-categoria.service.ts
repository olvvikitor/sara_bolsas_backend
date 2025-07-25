import { Inject, Injectable } from '@nestjs/common';
import CategoriaRepository from '../repository/categoria.repositry';
import { CreateCategoriaDto } from '../dtos/create-category-dto';

@Injectable()
export default class CreateCategoriaService{
  constructor(@Inject() private categoriaRepository:CategoriaRepository){

  }

  public async creatNewCategoria(createCategoriaDto:CreateCategoriaDto):Promise<void>{
    await this.categoriaRepository.createCategoria({
      nome:createCategoriaDto.nome,
      tipo:createCategoriaDto.tipo_categoria
    })
  }
}