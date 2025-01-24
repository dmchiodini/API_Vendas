import Product from "../entities/Product";

export type CreateProductDTO = {
  name: string;
  price: number;
  quantity: number;
};

export interface IProductsRepository {
  create({ name, price, quantity }: CreateProductDTO): Promise<Product>;
  get(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  getByName(name: string): Promise<Product | null>;
  update(product: Product): Promise<Product>;
  delete(product: Product): Promise<void>;
}
