import { Router } from "express";
import { container } from "tsyringe";
import { celebrate, Joi, Segments } from "celebrate";
import { SessionsController } from "../controllers/SessionController";

const sessionsRouter = Router();
const sessionController = container.resolve(SessionsController);

sessionsRouter.post(
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

export { sessionsRouter };
