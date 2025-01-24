import { inject, injectable } from "tsyringe";
import Product from "../entities/Product";
import { IProductsRepository } from "../repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";

type ShowProductServiceParams = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

@injectable()
export class UpdateProductService {
  constructor(
    @inject("ProductsRepository")
    private productRepository: IProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    price,
    quantity,
  }: ShowProductServiceParams): Promise<Product> {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new AppError("Product not found");
    }

    const productNameExists = await this.productRepository.getByName(name);

    if (productNameExists && name !== product.name) {
      throw new AppError("There is already one product with this name");
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    return this.productRepository.update(product);
  }
}
