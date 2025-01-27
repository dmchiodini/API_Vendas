import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "../repositories/IUsersRepository";
import User from "../entities/User";
import { compare } from "bcryptjs";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export class CreateSessionService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<User> {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError("Incorrect email/password combination.", 401);
    }

    return user;
  }
}
