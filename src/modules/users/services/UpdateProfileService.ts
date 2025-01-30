import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";
import User from "../entities/User";
import { AppError } from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password: string;
  old_password: string;
}

@injectable()
export class UpdateProfileService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.getById(user_id);

    if (!user) {
      throw new AppError("User not found.");
    }

    const emailExists = await this.userRepository.getByEmail(email);

    if (emailExists && emailExists.id !== user_id) {
      throw new AppError("There is already one user with this email.");
    }

    if (password && !old_password) {
      throw new AppError("Old password is required.");
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Old password doe not match.");
      }

      user.password = await hash(password, 10);
    }

    user.name = name;
    user.email = email;

    return this.userRepository.update(user);
  }
}
