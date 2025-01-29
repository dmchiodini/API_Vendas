import { productsRouter } from "@modules/products/routes/products.routes";
import { passwordRouter } from "@modules/users/routes/password.routes";
import { sessionsRouter } from "@modules/users/routes/sessions.routes";
import { usersRouter } from "@modules/users/routes/users.routes";
import { Router, Request, Response } from "express";

const routes = Router();

routes.get("/", (request: Request, response: Response) => {
  return response.json({ message: "Olá, dev!" });
});

routes.use("/products", productsRouter);
routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/password", passwordRouter);

export default routes;
