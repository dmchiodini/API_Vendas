import UserToken from "../entities/UserToken";

export interface IUserTokensRepository {
  create(user_id: string): Promise<UserToken>;
  getByToken(token: string): Promise<UserToken | null>;
}
