import { container } from "tsyringe";
import { UsersRepository } from "../repositories/UsersRepository";
import { UsersController } from "../controllers/UsersController";
import { SessionsController } from "../controllers/SessionsController";

container.registerSingleton("UsersRepository", UsersRepository);
container.registerSingleton("UsersController", UsersController);
container.registerSingleton("SessionsController", SessionsController);
