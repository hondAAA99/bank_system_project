import express from "express";
import { PORT } from "./config/config.services.js";
import {
  globalErrorHandling,
  SuccessResponse,
} from "./common/utils/globalErrorHandling.js";
import DBconnection from "./DB/db.connection.js";
import authRouter from "./modules/auth/auth.controller.js";
import accountsRouter from "./modules/accounts/accounts.controller.js";
import transactionsRouter from "./modules/transactions/transactions.controller.js";
const app = express();
const port = PORT;
const bootstrap = async () => {
  app.use(express.json());

  DBconnection();

  app.use("/auth", authRouter);
  app.use("/accounts", accountsRouter);
  app.use("/transactions", transactionsRouter);

  app.all("/", (req, res, next) => {
    SuccessResponse({ res, data: "welcome to the project server" });
  });
  app.use(globalErrorHandling);

  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
};

export default bootstrap;
