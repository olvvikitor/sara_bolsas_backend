import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateSubcategoriaDto {
  @ApiProperty({
    description: 'Nome da subcategoria',
    example: 'Couro',
  })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  nome: string;

    @ApiProperty({
    description: 'id da categoria pai',
    example: 'a3f1c2e4-5b6d-4e7f-8a9b-123456789abc',
  })
  @IsString({ message: 'id deve ser uma string' })
  @IsNotEmpty({ message: 'Id da categoria pai é obrigatório' })
  categoriaId: string;
}
