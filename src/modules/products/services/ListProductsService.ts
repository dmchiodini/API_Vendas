import { inject, injectable } from "tsyringe";
import Product from "../entities/Product";
import { IProductsRepository } from "../repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class ListProductsService {
  constructor(
    @inject("ProductsRepository")
    private productRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<Product[]> {
    return this.productRepository.get();
  }
}
