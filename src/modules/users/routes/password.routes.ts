import { Router } from "express";
import { container } from "tsyringe";
import { celebrate, Joi, Segments } from "celebrate";
import { ForgotPasswordController } from "../controllers/ForgotPasswordController";
import { ResetPasswordController } from "../controllers/ResetPasswordController";

const passwordRouter = Router();
const forgotPasswordController = container.resolve(ForgotPasswordController);
const resetPasswordController = container.resolve(ResetPasswordController);

passwordRouter.post(
  "/forgot",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  (request, response) => {
    return forgotPasswordController.create(request, response);
  },
);

passwordRouter.post(
  "/reset",
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      token: Joi.string().uuid().required(),
    },
  }),
  (request, response) => {
    return resetPasswordController.create(request, response);
  },
);

export { passwordRouter };
