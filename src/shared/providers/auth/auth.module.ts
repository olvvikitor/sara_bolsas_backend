import { Module } from "@nestjs/common";
import { AuthGuard } from "./AuthGuard";
import e from "express";

@Module({
    imports: [],
    providers: [AuthGuard],
    exports: [AuthGuard]

})
export class AuthModule {}