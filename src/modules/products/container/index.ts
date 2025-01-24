import { container } from "tsyringe";
import { IProductsRepository } from "../repositories/IProductsRepository";
import { ProductsRepository } from "../repositories/ProductsRepository";

container.registerSingleton<IProductsRepository>(
  "UsersRepository",
  ProductsRepository,
);
