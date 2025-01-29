import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { addHours, isAfter } from "date-fns";
import { IUserTokensRepository } from "../repositories/IUserTokensRepository";
import { hash } from "bcryptjs";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetPasswordService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.getByToken(token);

    if (!userToken) {
      throw new AppError("User token does not exists.");
    }

    const user = await this.userRepository.getById(userToken.user_id);

    if (!user) {
      throw new AppError("User does not exists.");
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired.");
    }

    user.password = await hash(password, 10);

    await this.userRepository.update(user);
  }
}
