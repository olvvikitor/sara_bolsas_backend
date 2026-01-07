import { Module } from "@nestjs/common";
import { CadastroClienteService } from "./services/cadastro.cliente.service";
import { ClienteRepository } from "./repository/cliente.repository";
import { CadastroController } from "./controllers/cadastro.controller";
import { ConfigModuleAplication } from "src/config/config.module";
import { HashModule } from "src/shared/providers/hash/hash.module";

@Module({
    imports:[ConfigModuleAplication,HashModule],
    controllers:[CadastroController],
    providers:[CadastroClienteService, ClienteRepository],
    exports:[CadastroClienteService, ClienteRepository]
})
export default class ClienteModule {}