import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSessionsService } from "../services/CreateSessionsService";

export class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createSessionsService = container.resolve(CreateSessionsService);

    const { email, password } = request.body;

    const createSession = await createSessionsService.execute({
      email,
      password,
    });

    return response.status(201).json(createSession);
  }
}
