import { AppError } from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";
import authConfig from "@config/auth";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT Token is missing", 401);
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decodeToken = verify(token, authConfig.jwt.secret as Secret);

    const { sub } = decodeToken as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError("Invalid JWT Token.", 401);
  }
}
