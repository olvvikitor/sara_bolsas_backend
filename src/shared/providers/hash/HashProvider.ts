import { Injectable } from "@nestjs/common";
import { IhashProvider } from "./IhashProvider";
import * as bcrypt from 'bcrypt';


@Injectable()
export class HashProvider implements IhashProvider {

    async gerarHash(payload: string): Promise<string> {
        return await bcrypt.hash(payload, 8);
    }

    compararHash(payload: string, hashed: string): Promise<boolean> {
        return bcrypt.compare(payload, hashed);  
    }    

}