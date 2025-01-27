import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSessionService } from "../services/CreateSessionService";

export class SessionsController {
  public async createSession(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createSessionService = container.resolve(CreateSessionService);

    const { email, password } = request.body;

    const createSession = await createSessionService.execute({
      email,
      password,
    });

    return response.status(201).json(createSession);
  }
}
