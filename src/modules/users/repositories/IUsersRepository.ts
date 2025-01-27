import User from "../entities/User";

export type CreateUsertDTO = {
  name: string;
  email: string;
  password: string;
};

export interface IUsersRepository {
  create({ name, email, password }: CreateUsertDTO): Promise<User>;
  get(): Promise<User[]>;
  getById(id: string): Promise<User | null>;
  getByName(name: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  update(User: User): Promise<User>;
  delete(User: User): Promise<void>;
}
