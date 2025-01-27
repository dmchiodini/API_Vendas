import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../repositories/IUsersRepository";
import User from "../entities/User";

@injectable()
export class ListUsersService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}

  public async execute(): Promise<User[]> {
    return this.userRepository.get();
  }
}
