import UserToken from "../entities/UserToken";

export interface IUserTokensRepository {
  create(user_id: string): Promise<UserToken | null>;
  getByToken(token: string): Promise<UserToken | null>;
}
