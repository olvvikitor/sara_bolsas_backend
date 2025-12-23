import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { HashModule } from "src/shared/providers/hash/hash.module";
import { LoginAdminController } from "./login.admin.controller";
import { AdminRepository } from "./admin.repository";
import { LoginAdminService } from "./login.admin.service";

@Module({
    imports: [HashModule,
        JwtModule.register({
            global:true,
            secret:process.env.JWT_SECRET,
            signOptions:{expiresIn:'2d'}
        })
    ],
    controllers: [LoginAdminController],
    providers: [AdminRepository, LoginAdminService],
    exports: []

})
export default class LoginAdminModule {}