import { DataSource } from "typeorm";
import { CreateProductsTable1737726624976 } from "./migrations/1737726624976-CreateProductsTable";
import Product from "@modules/products/entities/Product";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "vendasapi",
  entities: [Product],
  migrations: [CreateProductsTable1737726624976],
});
