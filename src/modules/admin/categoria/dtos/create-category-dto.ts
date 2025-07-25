import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'

export enum TIPO_CATEGORIA {
  MASCULINA = 'MASCULINA',
  FEMININA = 'FEMININA',
}

export class CreateCategoriaDto {
  @ApiProperty({
    description: 'Nome da categoria principal',
    example: 'Linha Masculina',
  })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string

  @ApiProperty({
    description: 'Tipo da categoria (masculina ou feminina)',
    enum: TIPO_CATEGORIA,
    example: TIPO_CATEGORIA.MASCULINA,
  })
  @IsEnum(TIPO_CATEGORIA, { message: 'Tipo inválido. Use MASCULINA ou FEMININA' })
  tipo_categoria: TIPO_CATEGORIA
}
