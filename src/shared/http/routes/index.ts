import { productsRouter } from "@modules/products/routes/products.routes";
import { Router, Request, Response } from "express";

const routes = Router();

routes.get("/", (request: Request, response: Response) => {
  return response.json({ message: "Olá, dev!" });
});

routes.use("/products", productsRouter);

export default routes;
