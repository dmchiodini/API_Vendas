import "dotenv/config";
import "reflect-metadata";
import { dataSource } from "@shared/typeorm";
import { app } from "./app";

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
