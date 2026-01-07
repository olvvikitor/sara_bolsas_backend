import { ApiProperty } from "@nestjs/swagger"
import { IsEmail, IsString, MaxLength, Min, MinLength, minLength } from "class-validator"

export class CadastroClienteDto {
    @ApiProperty({ example: 'João Silva', description: 'Nome completo do cliente' })
    @IsString()
    nome: string

    @ApiProperty({ example: 'joao@example.com', description: 'E-mail do cliente' })
    @IsString()
    @IsEmail({}, {message: 'O e-mail deve ser válido'})
    email: string

    @ApiProperty({ example: 'StrongPass123!', description: 'Senha do cliente', minLength: 6 })
    @IsString({message: 'A senha deve ser uma string'})
    @MinLength(6, {message: 'A senha deve ter no mínimo 6 caracteres'})
    senha: string

    @ApiProperty({ example: '12345678909', description: 'CPF do cliente' })
    @MinLength(11, {message: 'O CPF deve ter no mínimo 11 caracteres'})
    @MaxLength(11, {message: 'O CPF deve ter no máximo 11 caracteres'})
    cpf: string

    @ApiProperty({ example: '11 99999-9999', description: 'Telefone do cliente', required: false })
    @IsString()
    @MinLength(10, {message: 'O telefone deve ter no mínimo 10 caracteres'})
    @MaxLength(15, {message: 'O telefone deve ter no máximo 15 caracteres'})
    telefone?: string
}