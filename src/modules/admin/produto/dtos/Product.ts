export class CreateProductDto {
  nome:string
  preco:number
  descricao:string
  largura:number
  altura:number
  emPromocao:boolean
  precoPromocional?:number
  subcategoria:string
}