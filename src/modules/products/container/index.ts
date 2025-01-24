import { container } from "tsyringe";
import { ProductsRepository } from "../repositories/ProductsRepository";
import { ProductsController } from "../controllers/ProductsController";

container.registerSingleton("ProductsRepository", ProductsRepository);
container.registerSingleton("ProductsController", ProductsController);
