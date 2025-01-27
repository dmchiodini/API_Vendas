import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import {
  CreateUsertDTO,
  IUsersRepository,
} from "../repositories/IUsersRepository";
import User from "../entities/User";
import { hash } from "bcryptjs";

@injectable()
export class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: CreateUsertDTO): Promise<User> {
    const emailExists = await this.userRepository.getByEmail(email);

    if (emailExists) {
      throw new AppError("Email address already used.");
    }

    const hashedPassword = await hash(password, 10);

    return this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
  }
}
