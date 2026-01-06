import { Inject, Injectable } from "@nestjs/common";
import { ClienteRepository } from "../repository/cliente.repository";
import { ApiProperty } from '@nestjs/swagger';
import { CadastroClienteDto } from "../dtos/createClienteDto";



@Injectable()
export class CadastroClienteService {

    constructor(@Inject() private readonly clienteRepopsitory: ClienteRepository){

    }

    async cadastrarCliente(payload:CadastroClienteDto){
        await this.clienteRepopsitory.criarNewCliente(payload);
    }
}