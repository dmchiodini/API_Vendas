import { container } from "tsyringe";
import { UsersRepository } from "../repositories/UsersRepository";
import { UsersController } from "../controllers/UsersController";
import { SessionsController } from "../controllers/SessionController";

container.registerSingleton("UsersRepository", UsersRepository);
container.registerSingleton("UsersController", UsersController);
