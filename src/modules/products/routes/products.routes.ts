import { Router } from "express";
import { ProductsController } from "../controllers/ProductsController";
import { container } from "tsyringe";
import { celebrate, Joi, Segments } from "celebrate";

const productsRouter = Router();
const productsController = container.resolve(ProductsController);

productsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    },
  }),
  (request, response) => {
    return productsController.create(request, response);
  },
);

productsRouter.get("/", (request, response) => {
  return productsController.get(request, response);
});

productsRouter.get(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  (request, response) => {
    return productsController.getById(request, response);
  },
);

productsRouter.put(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      quantity: Joi.number().required(),
    },
  }),
  (request, response) => {
    return productsController.update(request, response);
  },
);

productsRouter.delete(
  "/:id",
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  (request, response) => {
    return productsController.delete(request, response);
  },
);

export { productsRouter };
