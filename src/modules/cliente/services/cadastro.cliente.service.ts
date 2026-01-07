import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { ClienteRepository } from "../repository/cliente.repository";
import { ApiProperty } from '@nestjs/swagger';
import { CadastroClienteDto } from "../dtos/createClienteDto";
import { IhashProvider } from "src/shared/providers/hash/IhashProvider";



@Injectable()
export class CadastroClienteService {

    constructor(@Inject() private readonly clienteRepopsitory: ClienteRepository,
        @Inject('IHashProvider') private readonly hashprovider: IhashProvider
    ) {
    }
    async cadastrarCliente(payload: CadastroClienteDto) {
        const clienteAlreadyExists = false
         
        const cliente = await this.clienteRepopsitory.findByEmail(payload.email);
        const clienteByCpf = await this.clienteRepopsitory.findByCpf(payload.cpf);
        const clienteByPhone = await this.clienteRepopsitory.findbyPhone(payload.telefone);

        if (cliente || clienteByCpf || clienteByPhone) {
            throw new ConflictException('Cliente já cadastrado com esse email, CPF ou telefone');
        }
        
        payload.senha = await this.hashprovider.gerarHash(payload.senha);
        await this.clienteRepopsitory.criarNewCliente(payload);
    }
}