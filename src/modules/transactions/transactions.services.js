import { banckAccountEnum } from "../../common/enum/bankAccount.enum.js";
import { transactionsTypeEnum } from "../../common/enum/transactions.type.enum.js";
import { transactionsStatusEnum } from "../../common/enum/transactionSttus.enum.js";
import {
  ErrorConflict,
  SuccessResponse,
} from "../../common/utils/globalErrorHandling.js";
import {
  create,
  find,
  findAll,
  findAndUpdate,
  findById,
} from "../../DB/DB.services.js";
import banckAccountModel from "../../DB/models/BankAccount.model.js";
import transactionsModel from "../../DB/models/Transactions.model.js";

export const getAllMyTransactions = async (req, res, next) => {
  const { user } = req;
  const { skip, limit } = req.params;
  const bankAccounts = await findAll({
    model: banckAccountModel,
    filter: { userId: user.id },
  });

  if (!bankAccounts) ErrorConflict("can not find any bank account");

  const transactions = await findAll({
    model: transactionsModel,
    filter: {
      accountId: bankAccounts.id,
    },
    option: {
      skip,
      limit,
    },
  });

  SuccessResponse({ res, data: transactions });
};

export const getOneTransaction = async (req, res, next) => {
  const { transactionId } = req.params;

  const transaction = await findById({
    model: transactionsModel,
    id: transactionId,
  });

  if (!transaction) ErrorConflict("there is not transaction");

  SuccessResponse({ res, data: transaction });
};

export const deposite = async (req, res, next) => {
  const { user } = req;
  const { accountNumber, depositeAmount } = req.body;
  const bankAcounts = await find({
    model: banckAccountModel,
    filter: {
      userId: user.id,
    },
    option: {
      select: "accountNumber",
    },
  });
  if (!bankAcounts.accountNumber.includes(accountNumber)) {
    ErrorConflict("you can not deposit from this account");
  }

  const getAccount = await find({
    model: banckAccountModel,
    filter: {
      accountNumber,
    },
  });

  if (getAccount.status != banckAccountEnum.active) {
    ErrorConflict("you can not deposit from this account");
  }
  if (getAccount.balance < depositeAmount) {
    await create({
      model: transactionsModel,
      data: {
        accountId: getAccount.id,
        type: transactionsTypeEnum.deposite,
        balanceBefore: getAccount.balance,
        amount: depositeAmount,
        balanceAfter: getAccount.balance,
        status: transactionsStatusEnum.failed,
      },
    });
    ErrorConflict("you dont have this amount of money");
  }

  const newAccountBalance = await findAndUpdate({
    model: banckAccountModel,
    filter: {
      accountNumber,
    },
    update: {
      balance: `${getAccount.balance - depositeAmount}`,
    },
    options: {
      new: true,
    },
  });

  await create({
    model: transactionsModel,
    data: {
      accountId: getAccount.id,
      type: transactionsTypeEnum.deposite,
      amount: depositeAmount,
      balanceBefore: getAccount.balance,
      balanceAfter: newAccountBalance.balance,
      status: transactionsStatusEnum.complete,
    },
  });

  SuccessResponse({ res, data: "deposite succeded" });
};
export const withDraw = async (req, res, next) => {
  const { user } = req;
  const { accountNumber, depositeAmount } = req.body;
  const bankAcounts = await find({
    model: banckAccountModel,
    filter: {
      userId: user.id,
    },
    option: {
      select: "accountNumber",
    },
  });
  if (!bankAcounts.accountNumber.includes(accountNumber)) {
    ErrorConflict("you can not withDraw to this account");
  }

  const getAccount = await find({
    model: banckAccountModel,
    filter: {
      accountNumber,
    },
  });

  if (getAccount.status != banckAccountEnum.active) {
    ErrorConflict("you can not deposit from this account");
  }

  const newAccountBalance = await findAndUpdate({
    model: banckAccountModel,
    filter: {
      accountNumber,
    },
    update: {
      balance: `${Number(getAccount.balance) + Number(depositeAmount)}`,
    },
    options: {
      new: true,
    },
  });

  await create({
    model: transactionsModel,
    data: {
      accountId: getAccount.id,
      type: transactionsTypeEnum.deposite,
      amount: depositeAmount,
      balanceBefore: Number(getAccount.balance),
      balanceAfter: newAccountBalance.balance,
      status: transactionsStatusEnum.complete,
    },
  });

  SuccessResponse({ res, data: "withDraw succeded" });
};
