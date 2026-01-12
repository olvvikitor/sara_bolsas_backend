import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateSubcategoriaDto {
  @ApiProperty({
    description: 'Nome da subcategoria',
    example: 'Couro',
    required: false,
  })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsOptional()
  nome?: string;

  @ApiProperty({
    description: 'id da categoria pai',
    example: 'a3f1c2e4-5b6d-4e7f-8a9b-123456789abc',
    required: false,
  })
  @IsString({ message: 'id deve ser uma string' })
  @IsOptional()
  categoriaId?: string;
}
