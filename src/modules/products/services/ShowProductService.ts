import { inject, injectable } from "tsyringe";
import Product from "../entities/Product";
import { IProductsRepository } from "../repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";

type ShowProductServiceParam = {
  id: string;
};

@injectable()
export class ShowProductService {
  constructor(
    @inject("ProductsRepository")
    private productRepository: IProductsRepository,
  ) {}

  public async execute({ id }: ShowProductServiceParam): Promise<Product> {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new AppError("Product not found");
    }

    return product;
  }
}
