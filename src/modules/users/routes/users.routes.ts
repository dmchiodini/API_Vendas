import { Router } from "express";
import { container } from "tsyringe";
import { celebrate, Joi, Segments } from "celebrate";
import { UsersController } from "../controllers/UsersController";
import { SessionsController } from "../controllers/SessionController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const usersRouter = Router();
const usersController = container.resolve(UsersController);
const sessionController = container.resolve(SessionsController);

usersRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  (request, response) => {
    return usersController.create(request, response);
  },
);

usersRouter.get("/", isAuthenticated, (request, response) => {
  return usersController.get(request, response);
});

export { usersRouter };
