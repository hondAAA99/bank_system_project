import {
  ErrorInteralServerError,
  SuccessResponse,
} from "../../common/utils/globalErrorHandling.js";
import { find } from "../../DB/DB.services.js";
import banckAccountModel from "../../DB/models/BankAccount.model.js";

export const getAccount = async (req, res, next) => {
  const { user } = req;
  const account = await find({
    model: banckAccountModel,
    filter: {
      userId: user.id,
    },
  });

  if (!account) {
    ErrorInteralServerError("can not find the account");
  }

  SuccessResponse({ res, data: account });
};
