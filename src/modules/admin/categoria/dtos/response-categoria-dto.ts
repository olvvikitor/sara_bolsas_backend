import { ApiProperty } from '@nestjs/swagger';
import { TIPO_CATEGORIA } from './create-category-dto';

export default class ResponseCategoryDto {
  @ApiProperty({
    description: 'id da categoria principal',
    example: 'Linha Masculina',
  })
  id: string;
  @ApiProperty({
    description: 'Nome da categoria principal',
    example: 'Linha Masculina',
  })
  nome: string;

    @ApiProperty({
    description: 'Tipo da categoria (masculina ou feminina)',
    enum: TIPO_CATEGORIA,
    example: TIPO_CATEGORIA.MASCULINA,
  })
  tipo:TIPO_CATEGORIA
}
