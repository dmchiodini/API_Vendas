import { RequestHandler, Router } from "express";
import multer from "multer";
import { container } from "tsyringe";
import { celebrate, Joi, Segments } from "celebrate";
import uploadConfig from "@config/upload";
import { UsersController } from "../controllers/UsersController";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import { UserAvatarController } from "../controllers/UserAvatarController";

const usersRouter = Router();
const usersController = container.resolve(UsersController);
const userAvatarController = container.resolve(UserAvatarController);

const upload: multer.Multer = multer(uploadConfig);

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

usersRouter.patch(
  "/avatar",
  isAuthenticated,
  upload.single("avatar") as any,
  (request, response) => {
    return userAvatarController.update(request, response);
  },
);

export { usersRouter };
