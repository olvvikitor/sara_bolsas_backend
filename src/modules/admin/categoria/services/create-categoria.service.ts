import { ConflictException, Inject, Injectable } from '@nestjs/common';
import CategoriaRepository from '../repository/categoria.repository';
import { CreateCategoriaDto } from '../dtos/create-category-dto';

@Injectable()
export default class CreateCategoriaService{
  constructor(@Inject() private categoriaRepository:CategoriaRepository){

  }

  public async creatNewCategoria(createCategoriaDto:CreateCategoriaDto):Promise<void>{

    const categoriaExist = await this.categoriaRepository.getGategoryByName(createCategoriaDto.nome)

    if(categoriaExist){
      throw new ConflictException('Já existe uma categoria com esse nome')
    }
    await this.categoriaRepository.createCategoria({
      nome:createCategoriaDto.nome,
      tipo:createCategoriaDto.tipo
    })
  }

}