import { Body, Controller, Post } from "@nestjs/common";
import { LoginAdminService } from "./login.admin.service";
import { LoginAdminDTO } from "./dtos/LoginAdminDTO";
import { ApiOperation, ApiTags } from "@nestjs/swagger";


@ApiTags('Admin Login')
@Controller('admin/login')
export class LoginAdminController{
    constructor(private loginAdminService:LoginAdminService){
    }

    @ApiOperation({ summary: 'Login de administrador e retorno de token' })
    @Post('returnToken')
    async login(@Body() payload:LoginAdminDTO){
        return await this.loginAdminService.loginAdmin(payload);
    }

    

}