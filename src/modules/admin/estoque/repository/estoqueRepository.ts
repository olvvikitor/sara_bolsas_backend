import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "src/config/prisma.service";


@Injectable()
export class EstoqueRepository {

    constructor(@Inject () private readonly prisma: PrismaService) {
        // Inicialização do repositório, se necessário

    }

    // Métodos relacionados ao estoque
    async atualizarEstoqueProduto(idProduto: string, novaQuantidade: number): Promise<void> {
        // Lógica para atualizar o estoque do produto no banco de dados
    }
    async criarRegistroEstoque({
        idProduto,
        unidadeMedida,
        alertaMinimo,
        quantidadeMinima,
        quantidade
    }): Promise<void> {
        await this.prisma.estoque.create({
            data: {
                produtoId: idProduto,
                unidade: unidadeMedida,
                alertaMinimo: alertaMinimo,
                quantidadeMinima: quantidadeMinima,
                quantidade: quantidade,
            }
        });
    }
}