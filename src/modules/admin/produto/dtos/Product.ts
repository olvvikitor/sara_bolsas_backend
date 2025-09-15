import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsBoolean,
  IsOptional,
  IsUUID,
  ValidateIf,
  Min,
  IsPositive,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsFileOrEmpty } from 'src/shared/validators/IsFileOrEmpty';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nome do produto',
    example: 'Bolsa de couro Firenze',
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Preço do produto em reais (use ponto como separador decimal em strings)',
    example: 249.9,
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'preco deve ser um número' })
  @Min(0)
  preco: number;

  @ApiPropertyOptional({
    description: 'Descrição detalhada do produto',
    example: 'Bolsa feminina em couro legítimo, forro interno e bolso com zíper.',
  })
  @IsOptional()
  @IsString()
  descricao?: string;

  @ApiProperty({
    description: 'Largura do produto (cm)',
    example: 30,
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'largura deve ser um número' })
  @IsPositive()
  largura: number;

  @ApiProperty({
    description: 'Altura do produto (cm)',
    example: 22,
  })
  @Type(() => Number)
  @IsNumber({}, { message: 'altura deve ser um número' })
  @IsPositive()
  altura: number;

  @ApiProperty({
    description: 'Indica se o produto está em promoção',
    example: false,
  })
  @Type(() => Boolean)
  @IsBoolean()
  emPromocao: boolean;

  @ApiPropertyOptional({
    description:
      'Preço promocional (obrigatório quando emPromocao = true). Deve ser menor que `preco` em regra de negócio.',
    example: 199.9,
  })
  @ValidateIf((o) => o.emPromocao === true)
  @Type(() => Number)
  @IsNumber({}, { message: 'precoPromocional deve ser um número' })
  @Min(0)
  precoPromocional?: number;

  @ApiProperty({
    description: 'ID da categoria (UUID)',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsUUID()
  id_categoria: string;

  @ApiProperty({
    description: 'ID da subcategoria (UUID)',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @IsUUID()
  id_subcategoria: string;

  @ApiPropertyOptional({
    description: 'Imagem do produto',
    required: false,
    type: [String],
    format: 'binary', // Define como um arquivo binário
  })
  @IsOptional()
  @IsFileOrEmpty() // Valida que o campo será um arquivo
  img?: string[]
}
