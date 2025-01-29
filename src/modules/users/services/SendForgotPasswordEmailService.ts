import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";
import { IUserTokensRepository } from "../repositories/IUserTokensRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { EtherealMail } from "@config/mail/EtherealMail";
import { template } from "handlebars";

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

    const { token } = await this.userTokensRepository.create(user.id);

    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: "[API Vendas] Recuperação de Senha",
      templateData: {
        template: `Olá, {{name}}: {{token}}`,
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}
