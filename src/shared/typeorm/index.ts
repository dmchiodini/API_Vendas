import { DataSource } from "typeorm";
import { CreateProductsTable1737726624976 } from "./migrations/1737726624976-CreateProductsTable";
import Product from "@modules/products/entities/Product";
import { CreateUsers1737986825854 } from "./migrations/1737986825854-CreateUsers";
import User from "@modules/users/entities/User";
import { CreateUserTokens1738070775094 } from "./migrations/1738070775094-CreateUserTokens";
import UserToken from "@modules/users/entities/UserToken";

export const dataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "vendasapi",
  entities: [Product, User, UserToken],
  migrations: [
    CreateProductsTable1737726624976,
    CreateUsers1737986825854,
    CreateUserTokens1738070775094,
  ],
});
