import { inject, injectable } from "tsyringe";
import Product from "../entities/Product";
import { IProductsRepository } from "../repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";

type CreateProductDTO = {
  name: string;
  price: number;
  quantity: number;
};

@injectable()
export class CreateProductService {
  constructor(
    @inject("ProductsRepository")
    private productRepository: IProductsRepository,
  ) {}

  public async execute({
    name,
    price,
    quantity,
  }: CreateProductDTO): Promise<Product> {
    const productExists = await this.productRepository.getByName(name);

    if (productExists) {
      throw new AppError("There is already one product with this name");
    }

    return this.productRepository.create({
      name,
      price,
      quantity,
    });
  }
}
