import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/config/prisma.service";
import { CadastroClienteDto } from "../dtos/createClienteDto";

@Injectable()
export class ClienteRepository {
    constructor(private readonly prismaService: PrismaService) {
    }
    async criarNewCliente(createClienteData: CadastroClienteDto) {
        await this.prismaService.cliente.create({
            data: {
                ...createClienteData
            }
        })
    }
    async findByEmail(email: string) {
        return await this.prismaService.cliente.findUnique({
            where: {
                email
            }
        })
    }
    async findById(id: string) {
        return await this.prismaService.cliente.findFirst({
            where: {
                id
            }
        })
    }
    async findbyPhone(telefone: string) {
        return await this.prismaService.cliente.findFirst({
            where: {
                telefone
            }
        })
    }
    async findByCpf(cpf: string) {
        return await this.prismaService.cliente.findFirst({
            where: {
                cpf
            }
        })
    }
}