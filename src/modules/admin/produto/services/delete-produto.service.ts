import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import IStorageProvider from "src/shared/providers/storage/IStorageProvider";
import ProductRepository from "../repository/product.repository";

@Injectable()
export class DeleteProductService{
    constructor(
        @Inject('IStorageProvider') private storageProvider :IStorageProvider,
        @Inject() private productRepository :ProductRepository
    ){}

    async delete(id:string):Promise<void>{
        const product = await this.productRepository.findById(id)
        if (!product){
            throw new NotFoundException('Produto não encontrado')
            }
        await this.productRepository.deleteById(id)
        if(product.imagemExterna.length>0){
            product.imagemExterna.map(async(link)=> await this.storageProvider.delete(link))
        }
        if(product.imagemInterna.length>0){
            product.imagemInterna.map(async(link)=> await this.storageProvider.delete(link))
        }
    }
}