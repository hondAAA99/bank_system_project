import { model } from "mongoose";
import {
  ErrorInteralServerError,
  SuccessResponse,
} from "../../common/utils/globalErrorHandling.js";
import { create } from "../../DB/DB.services.js";
import userModel from "../../DB/models/user.model.js";
import banckAccountModel from "../../DB/models/BankAccount.model.js";
import { banckAccountEnum } from "../../common/enum/bankAccount.enum.js";
import { compare, hash } from "../../common/utils/security/hash.securety.js";
import {
  findUser,
  generateAccessAndRefreshTokens,
} from "./services.helpers.js";

export const register = async (req, res, next) => {
  const { userName, email, password } = req.body;
  try {
    const user = await create({
      model: userModel,
      data: {
        userName,
        email,
        password: hash(password),
      },
    });

    const { accountNumber } = await create({
      model: banckAccountModel,
      data: {
        userId: user.id,
        accountNumber: Math.floor(Math.random() * 9000000),
        balance: 0,
        status: banckAccountEnum.active,
      },
    });

    // const  beneficiary  = await create({
    //   model: banckAccountModel,
    //   data: {
    //     userId: user.id,
    //     accountNumber: Math.floor(Math.random() * 9000000),
    //     balance: 0,
    //     status: banckAccountEnum.active,
    //   },
    // });

    SuccessResponse({ res, data: `your account number is ${accountNumber}` });
  } catch (err) {
    ErrorInteralServerError(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await (async function findUserAndChechPassword() {
    const user = await findUser({
      email,
      confirmed: {
        $exists: true,
      },
    });

    if (!user) throw new Error("user does not exists", { cause: 405 });
    if (
      !compare({
        plainText: password,
        hashedText: user.password,
      })
    ) {
      throw new Error("invalid password", { cause: 400 });
    }
    return user;
  })();

  const { accessToken, refreshToken } = generateAccessAndRefreshTokens(user);
  return SuccessResponse({ res, data: { accessToken, refreshToken } });
};
