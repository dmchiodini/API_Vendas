import { dataSource } from "@shared/typeorm";
import User from "../entities/User";
import { CreateUsertDTO, IUsersRepository } from "./IUsersRepository";
import { Repository } from "typeorm";

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = dataSource.getRepository(User);
  }

  public async create({
    name,
    email,
    password,
  }: CreateUsertDTO): Promise<User> {
    const user = await this.repository.create({ name, email, password });

    return this.repository.save(user);
  }

  public async get(): Promise<User[]> {
    return this.repository.find();
  }

  public async getById(id: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ id });

    return user;
  }

  public async getByName(name: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ name });
    return user;
  }

  public async getByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOneBy({ email });
    return user;
  }

  public async update(user: User): Promise<User> {
    return this.repository.save(user);
  }

  public async delete(user: User): Promise<void> {
    await this.repository.remove(user);
  }
}
