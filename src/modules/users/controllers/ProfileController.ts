import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateProfileService } from "../services/UpdateProfileService";
import { ShowProfileService } from "../services/ShowProfileService";

export class ProfileController {
  public async getById(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const showProfileService = container.resolve(ShowProfileService);
    const user_id = request.user.id;

    const users = await showProfileService.execute({ user_id });

    return response.status(200).json(users);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfileService = container.resolve(UpdateProfileService);
    const user_id = request.user.id;

    const { name, email, password, old_password } = request.body;

    const user = await updateProfileService.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.status(200).json(user);
  }
}
