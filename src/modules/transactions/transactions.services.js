import { banckAccountEnum } from "../../common/enum/bankAccount.enum.js";
import { transactionsTypeEnum } from "../../common/enum/transactions.type.enum.js";
import { transactionsStatusEnum } from "../../common/enum/transactionSttus.enum.js";
import {
  ErrorConflict,
  ErrorInteralServerError,
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
import {
  checkAccountOwner,
  getAccount,
  checkAccountBalance,
  updateAccountBalance,
  createTransaction,
} from "./services.helpers.js";

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
  const { account, depositeAmount } = req.body;
  await checkAccountOwner(account, user.id);
  const getAccount = await getAccount(account);

  if (getAccount.status != banckAccountEnum.active) {
    ErrorConflict("you can not deposit from this account");
  }
  await checkAccountBalance({ getAccount, depositeAmount });
  const newAccountBalance = await updateAccountBalance({
    accountNumber,
    getAccount,
    depositeAmount,
    subject: transactionsTypeEnum.deposite,
  });
  const depositeTransaction = await createTransaction({
    getAccount,
    depositeAmount,
    newAccountBalance,
    type: transactionsTypeEnum.deposite,
  });
  depositeTransaction.status = transactionsStatusEnum.complete;
  depositeTransaction.save();

  SuccessResponse({ res, data: "deposite succeded" });
};
export const withDraw = async (req, res, next) => {
  const { user } = req;
  const { account, depositeAmount } = req.body;
  await checkAccountOwner(account , user.id);
  const getAccount = await getAccount(account);
  if (getAccount.status != banckAccountEnum.active) {
    ErrorConflict("you can not withdraw to this account");
  }
  const newAccountBalance = await updateAccountBalance({
    accountNumber,
    getAccount,
    depositeAmount,
    subject: transactionsTypeEnum.withDraw,
  });
  const withdrawTransaction = await createTransaction({
    getAccount,
    depositeAmount,
    newAccountBalance,
    type: transactionsTypeEnum.deposite,
  });
      withdrawTransaction.status = transactionsStatusEnum.complete;
      withdrawTransaction.save();

  SuccessResponse({ res, data: "withDraw succeded" });
};
export const transfer = async (req, res, next) => {
  const { user } = req;
  const { beneficiary, account, depositeAmount } = req.body;
  await checkAccountOwner(account,user.id);
  const getUserAcc = await getAccount(account);
  if (getUserAcc.status != banckAccountEnum.active) {
      ErrorConflict("you can not withdraw to this account");
  }
  await checkAccountBalance({ getUserAcc, depositeAmount });
    const newDepositeAccountBalance = await updateAccountBalance({
      account,
      getUserAcc,
      depositeAmount,
      subject: transactionsTypeEnum.deposite,
    });
    const depositeTransaction = await createTransaction({
      getUserAcc,
      depositeAmount,
      newAccountBalance : newDepositeAccountBalance,
      type: transactionsTypeEnum.transfer,
    });
    const getBeneAccount = await getAccount(beneficiary);
    if (getBeneAccount.status != banckAccountEnum.active) {
      ErrorConflict("you can not withdraw to this account");
    }
    const newWithdrawAccountBalance = await updateAccountBalance({
      account,
      getUserAcc : getBeneAccount,
      depositeAmount,
      subject: transactionsTypeEnum.withDraw,
    });
    const withdrawTransaction = await createTransaction({
      getUserAcc: getBeneAccount,
      depositeAmount,
      newAccountBalance: newWithdrawAccountBalance,
      type: transactionsTypeEnum.transfer,
    });
    withdrawTransaction.status = transactionsStatusEnum.complete;
    withdrawTransaction.save();
    depositeTransaction.status = transactionsStatusEnum.complete;
    depositeTransaction.save();
    SuccessResponse({res, data : 'transaction succeded'})

};
