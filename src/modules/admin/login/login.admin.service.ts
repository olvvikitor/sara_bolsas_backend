import { Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { AdminRepository } from "./admin.repository";
import { LoginAdminDTO } from "./dtos/LoginAdminDTO";
import { JwtService } from "@nestjs/jwt";
import { IhashProvider } from "src/shared/providers/hash/IhashProvider";
import { AdminJwtPayload } from "src/shared/providers/auth/AuthGuard";

@Injectable()
export class LoginAdminService {

    constructor(private adminRepository: AdminRepository, private jwtService: JwtService, 
        @Inject('IHashProvider')private hashProvider:IhashProvider
    ){}

    async loginAdmin(payload:LoginAdminDTO):Promise<{token:string}>{
        const admin = await this.adminRepository.findByEmail(payload.email);
        const passwordMatch = await this.hashProvider.compararHash(payload.password, admin.password);
        if(!passwordMatch){
            throw new UnauthorizedException('Email ou senha incorretos');
        }
        const payloadToken:AdminJwtPayload = {
            sub: admin.id,
            email: admin.email,
            type: 'ADMIN'
        }
        const token = this.jwtService.sign(payloadToken);

        return {
            token
        }
    }



}