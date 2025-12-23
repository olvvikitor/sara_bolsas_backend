import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/config/prisma.service";


@Injectable()
export class AdminRepository {
    constructor(
        private readonly prismaService:PrismaService
    ){}

    async findByEmail(email:string){
        return await this.prismaService.adminUser.findUnique({
            where:{
                email
            }
        });
    }

}