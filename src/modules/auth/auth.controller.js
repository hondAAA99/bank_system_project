import { Router } from "express";
import { checkEmail } from "../../common/middleWare/checkEmail.js";
import { login, register } from "./auth.services.js";
import { validateMiddleWare } from "../../common/middleWare/validation.js";
import { loginSchema, registerSchema } from "./auth.schema.js";

const authRouter = Router();

authRouter.post(
  "/register",
  validateMiddleWare(registerSchema),
  checkEmail,
  register,
);
authRouter.post("/login", validateMiddleWare(loginSchema), login);

export default authRouter;
