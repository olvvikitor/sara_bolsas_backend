import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import ProductRepository from '../repository/product.repository';
import { CreateProductDto } from '../dtos/Product';
import FindCategoriaService from '../../categoria/services/get-categoria.service';
import FindSubcategoryService from '../../subcategoria/services/findsubcategoryById';
import { CreateEstoqueService } from '../../estoque/services/create.estoque.minimo';
import { UpdadeProductDto } from '../dtos/Update';
import IStorageProvider from 'src/shared/providers/storage/IStorageProvider';

@Injectable()
export default class UpdateProductService {
  constructor(
    @Inject() private produtoRepository: ProductRepository,
    @Inject() private categoryService: FindCategoriaService,
    @Inject() private subcategoryService: FindSubcategoryService,
    @Inject('IStorageProvider')
    private storageProvider: IStorageProvider,  ) {}
  async updateProduct(id:string,payload: UpdadeProductDto): Promise<void> {


    const product = await this.produtoRepository.findById(id)
    if(!product){
      throw new NotFoundException("Produto não encontrado")
    }
    payload.img_interna_url.concat(product.imagemInterna)
    payload.img_externa_url.concat(product.imagemExterna)

    if(payload.imgs_removidas_extenas){
      await Promise.all(payload.imgs_removidas_extenas.map((img)=>{
        this.storageProvider.delete(img)
      }))
    }

    if(payload.imgs_removidas_internas){
      await Promise.all(payload.imgs_removidas_internas.map((img)=>{
        this.storageProvider.delete(img)
      }))
    }

    const subcategoria = await this.subcategoryService.findById(
      payload.id_subcategoria,
    );

    if (!subcategoria) {
      throw new NotFoundException('Subcategoria não encontrada');
    }

    const categoria = await this.categoryService.findCategoriaById(
      payload.id_categoria,
    );

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    await this.produtoRepository.updateProduct(id,payload);
  }

}

