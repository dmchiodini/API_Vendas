import { inject, injectable } from "tsyringe";
import Product from "../entities/Product";
import { IProductsRepository } from "../repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";

type DeleteProductServiceParam = {
  id: string;
};

@injectable()
export class DeleteProductService {
  constructor(
    @inject("ProductsRepository")
    private productRepository: IProductsRepository,
  ) {}

  public async execute({ id }: DeleteProductServiceParam): Promise<void> {
    const product = await this.productRepository.getById(id);

    if (!product) {
      throw new AppError("Product not found");
    }

    await this.productRepository.delete(product);
  }
}
