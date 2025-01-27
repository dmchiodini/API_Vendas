import { container } from "tsyringe";
import { UsersRepository } from "../repositories/UsersRepository";
import { UsersController } from "../controllers/UsersController";
import { SessionsController } from "../controllers/SessionsController";
import { UserAvatarController } from "../controllers/UserAvatarController";

container.registerSingleton("UsersRepository", UsersRepository);
container.registerSingleton("UsersController", UsersController);
container.registerSingleton("SessionsController", SessionsController);
container.registerSingleton("UserAvatarController", UserAvatarController);
