export interface IhashProvider {
    gerarHash(payload: string): Promise<string>;
    compararHash(payload: string, hashed: string): Promise<boolean>;
}