import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiBody } from "@nestjs/swagger";
import { CadastroClienteService } from "../services/cadastro.cliente.service";
import { CadastroClienteDto } from "../dtos/createClienteDto";



@Controller('cadastro')
export class CadastroController {

    constructor(@Inject()private readonly cadastroClienteService:CadastroClienteService){
    }

    @Post('cliente/new')
    @ApiBody({ type: CadastroClienteDto })
    async cadastroCliente(@Body() payload: CadastroClienteDto) {
        return await this.cadastroClienteService.cadastrarCliente(payload);
    }

    

}