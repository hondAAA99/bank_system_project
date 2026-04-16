import { Router } from "express";
import { authenticate } from "../../common/utils/security/authentication.js";
import { validateMiddleWare } from "../../common/middleWare/validation.js";
import {
  deposite,
  getAllMyTransactions,
  getOneTransaction,
  transfer,
  withDraw,
} from "./transactions.services.js";
import { depostAndWithDrawSchmea, transferSchmea } from "./transaction.Schema.js";

const transactionsRouter = Router();

transactionsRouter.get("/my", authenticate, getAllMyTransactions);

transactionsRouter.get("/:transactionId", authenticate, getOneTransaction);

transactionsRouter.post(
  "/deposite",
  validateMiddleWare(depostAndWithDrawSchmea),
  authenticate,
  deposite,
);
transactionsRouter.post(
  "/withdraw",
  validateMiddleWare(depostAndWithDrawSchmea),
  authenticate,
  withDraw,
);
transactionsRouter.post(
  "/transfer",
  validateMiddleWare(transferSchmea),
  authenticate,
  transfer,
);

export default transactionsRouter;
