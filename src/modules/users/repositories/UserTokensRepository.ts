import { dataSource } from "@shared/typeorm";
import { Repository } from "typeorm";
import { IUserTokensRepository } from "./IUserTokensRepository";
import UserToken from "../entities/UserToken";

export class UserTokensRepository implements IUserTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = dataSource.getRepository(UserToken);
  }

  public async create(user_id: string): Promise<UserToken> {
    const userToken = await this.repository.create({ user_id });

    return this.repository.save(userToken);
  }

  public async getByToken(token: string): Promise<UserToken | null> {
    const user = await this.repository.findOneBy({ token });
    return user;
  }
}
