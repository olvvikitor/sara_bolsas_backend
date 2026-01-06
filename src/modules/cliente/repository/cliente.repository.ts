import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/config/prisma.service";
import { CadastroClienteDto } from "../dtos/createClienteDto";

@Injectable()
export class ClienteRepository {
    constructor(private readonly prismaService: PrismaService) {
    }
    async criarNewCliente(createClienteData:CadastroClienteDto){
        console.log(createClienteData);
        await this.prismaService.cliente.create({
            data:{
                ...createClienteData
            }
        })
    }
}