import { RequestHandler, Router } from "express";
import multer from "multer";
import { container } from "tsyringe";
import { celebrate, Joi, Segments } from "celebrate";
import uploadConfig from "@config/upload";
import { UsersController } from "../controllers/UsersController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import { UserAvatarController } from "../controllers/UserAvatarController";
import { ProfileController } from "../controllers/ProfileController";

const profileRouter = Router();
const profileController = container.resolve(ProfileController);

profileRouter.use(isAuthenticated);

profileRouter.get("/", isAuthenticated, (request, response) => {
  return profileController.getById(request, response);
});

profileRouter.put(
  "/",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().optional(),
      old_password: Joi.string().when("password", {
        is: Joi.exist(),
        then: Joi.required(),
      }),
    },
  }),
  (request, response) => {
    return profileController.update(request, response);
  },
);

export { profileRouter };
