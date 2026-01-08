import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import ProductRepository from '../repository/product.repository';
import { CreateProductDto } from '../dtos/Product';
import FindCategoriaService from '../../categoria/services/get-categoria.service';
import FindSubcategoryService from '../../subcategoria/services/findsubcategoryById';
import { CreateEstoqueService } from '../../estoque/services/create.estoque.minimo';

@Injectable()
export default class CreateProdutoService {
  constructor(
    @Inject() private produtoRepository: ProductRepository,
    @Inject() private categoryService: FindCategoriaService,
    @Inject() private subcategoryService: FindSubcategoryService,
    @Inject() private createEstoqueService: CreateEstoqueService,
  ) {}
  async createNewProduct(payload: CreateProductDto): Promise<void> {

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
    await this.produtoRepository.createNewProduct(payload);
  }
}
