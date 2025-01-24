import "dotenv/config";
import "reflect-metadata";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import routes from "./routes";
import { AppError } from "@shared/errors/AppError";
import "@shared/typeorm";
import { dataSource } from "@shared/typeorm";
import "@shared/container";
import { errors } from "celebrate";

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors());

app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    console.log(error);
    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  },
);

dataSource
  .initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}!`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
