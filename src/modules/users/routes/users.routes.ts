import { Router } from "express";
import { container } from "tsyringe";
import { celebrate, Joi, Segments } from "celebrate";
import { UsersController } from "../controllers/UsersController";
import { SessionsController } from "../controllers/SessionController";

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

usersRouter.get("/", (request, response) => {
  return usersController.get(request, response);
});

usersRouter.post(
  "/session",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  (request, response) => {
    return sessionController.createSession(request, response);
  },
);

export { usersRouter };
