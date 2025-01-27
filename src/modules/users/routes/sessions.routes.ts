import { Router } from "express";
import { container } from "tsyringe";
import { celebrate, Joi, Segments } from "celebrate";
import { SessionsController } from "../controllers/SessionsController";

const sessionsRouter = Router();
const sessionController = container.resolve(SessionsController);

sessionsRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  (request, response) => {
    return sessionController.create(request, response);
  },
);

export { sessionsRouter };
