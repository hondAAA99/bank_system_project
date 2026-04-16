import { Router } from "express";
import { authenticate } from "../../common/utils/security/authentication.js";
import { validateMiddleWare } from "../../common/middleWare/validation.js";
// import { getAllMyTransactionsScheam } from "./transaction.Schema.js";
import {
  deposite,
  getAllMyTransactions,
  getOneTransaction,
  withDraw,
} from "./transactions.services.js";
import { depostAndWithDrawSchmea } from "./transaction.Schema.js";

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

export default transactionsRouter;
