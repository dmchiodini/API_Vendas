import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";
import User from "../entities/User";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
}

@injectable()
export class ShowProfileService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.userRepository.getById(user_id);

    if (!user) {
      throw new AppError("User not found.");
    }

    return user;
  }
}
