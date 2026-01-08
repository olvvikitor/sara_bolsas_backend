import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { EstoqueRepository } from "../repository/estoqueRepository";

export interface CreateEstoquePayload {
        idProduto: string,
        unidadeMedida: string,
        alertaMinimo: boolean,
        quantidadeMinima: number,
        quantidade: number
    }

@Injectable()
export class CreateEstoqueService {
    constructor(
        @Inject () private estoqueRepository: EstoqueRepository,
    ) {}


    async criarEstoque(payload: CreateEstoquePayload) {
        if(!payload.alertaMinimo){
            payload.quantidadeMinima = 0;
        }
        if(payload.quantidade <= 0){
            throw new BadRequestException('Quantidade deve ser maior que zero');
        }
        if(payload.quantidadeMinima < payload.quantidade){
            throw new BadRequestException('Quantidade mínima não pode ser menor que a quantidade em estoque');
        }
        await this.estoqueRepository.criarRegistroEstoque(payload);
    }
}