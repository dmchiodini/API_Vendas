import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "../repositories/IUsersRepository";
import User from "../entities/User";
import path from "node:path";
import uploadConfig from "@config/upload";
import fs from "node:fs";

type UpdateUserAvatarServiceDTO = {
  user_id: string;
  avatarFilename: string | undefined;
};

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    avatarFilename,
  }: UpdateUserAvatarServiceDTO): Promise<User> {
    const user = await this.userRepository.getById(user_id);

    if (!user) {
      throw new AppError("User not found.");
    }
    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename as string;

    await this.userRepository.update(user);

    return user;
  }
}
