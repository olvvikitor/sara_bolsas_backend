import { Module } from "@nestjs/common";
import { HashProvider } from "./HashProvider";

@Module({
    imports: [],
    providers: [{
        provide: 'IHashProvider',
        useClass: HashProvider
    }],
    exports: ['IHashProvider']

})
export class HashModule {}