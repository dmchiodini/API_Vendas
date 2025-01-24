import { DataSource } from "typeorm";
import { CreateProductsTable1737726624976 } from "./migrations/1737726624976-CreateProductsTable";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "vendasapi",
  entities: [],
  migrations: [CreateProductsTable1737726624976],
});
