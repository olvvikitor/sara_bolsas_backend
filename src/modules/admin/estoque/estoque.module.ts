import { Module } from "@nestjs/common";
import { ConfigModuleAplication } from "src/config/config.module";
import { EstoqueRepository } from "./repository/estoqueRepository";
import { CreateEstoqueService } from "./services/create.estoque.minimo";

@Module({
    imports: [ConfigModuleAplication],
    controllers: [],
    providers: [EstoqueRepository, CreateEstoqueService],
    exports: [CreateEstoqueService],
})
export class EstoqueModule {}