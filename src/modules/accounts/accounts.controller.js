import { Router } from "express";
import { authenticate } from "../../common/utils/security/authentication.js";
import { getAccount } from "./accounts.services.js";

const accountsRouter = Router();

accountsRouter.get("/me", authenticate, getAccount);

export default accountsRouter