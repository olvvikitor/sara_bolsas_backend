import { Module } from "@nestjs/common";
import { CadastroClienteService } from "./services/cadastro.cliente.service";
import { ClienteRepository } from "./repository/cliente.repository";
import { CadastroController } from "./controllers/cadastro.controller";
import { ConfigModuleAplication } from "src/config/config.module";

@Module({
    imports:[ConfigModuleAplication],
    controllers:[CadastroController],
    providers:[CadastroClienteService, ClienteRepository],
    exports:[CadastroClienteService, ClienteRepository]
})
export default class ClienteModule {}