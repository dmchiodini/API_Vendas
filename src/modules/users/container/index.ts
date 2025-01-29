import { container } from "tsyringe";
import { UsersRepository } from "../repositories/UsersRepository";
import { UsersController } from "../controllers/UsersController";
import { SessionsController } from "../controllers/SessionsController";
import { UserAvatarController } from "../controllers/UserAvatarController";
import { UserTokensRepository } from "../repositories/UserTokensRepository";
import { ForgotPasswordController } from "../controllers/ForgotPasswordController";

container.registerSingleton("UsersRepository", UsersRepository);
container.registerSingleton("UsersController", UsersController);
container.registerSingleton("SessionsController", SessionsController);
container.registerSingleton("UserAvatarController", UserAvatarController);
container.registerSingleton("UserTokensRepository", UserTokensRepository);
container.registerSingleton(
  "ForgotPasswordController",
  ForgotPasswordController,
);
