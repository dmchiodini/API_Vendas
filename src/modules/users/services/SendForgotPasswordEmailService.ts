import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IUserTokensRepository } from "../repositories/IUserTokensRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";

interface IRequest {
  email: string;
}

@injectable()
export class SendForgotPasswordEmailService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private userTokensRepository: IUserTokensRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new AppError("User does not exists.");
    }

    const generateToken = await this.userTokensRepository.create(user.id);

    console.log("generateToken", generateToken);
  }
}
