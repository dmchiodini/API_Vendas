import { Repository } from "typeorm";
import Product from "../entities/Product";
import { dataSource } from "@shared/typeorm";
import { CreateProductDTO, IProductsRepository } from "./IProductsRepository";

export class ProductsRepository implements IProductsRepository {
  private repository: Repository<Product>;

  constructor() {
    this.repository = dataSource.getRepository(Product);
  }

  public async create({
    name,
    price,
    quantity,
  }: CreateProductDTO): Promise<Product> {
    const product = await this.repository.create({ name, price, quantity });

    return this.repository.save(product);
  }

  public async get(): Promise<Product[]> {
    return this.repository.find();
  }

  public async getById(id: string): Promise<Product | null> {
    const product = await this.repository.findOneBy({ id });

    return product;
  }

  public async getByName(name: string): Promise<Product | null> {
    const product = await this.repository.findOneBy({ name });

    return product;
  }

  public async update(product: Product): Promise<Product> {
    return this.repository.save(product);
  }

  public async delete(product: Product): Promise<void> {
    await this.repository.remove(product);
  }
}
