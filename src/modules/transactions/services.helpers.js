import {
  create,
  find,
  findAndUpdate,
} from "../../DB/DB.services.js";
import banckAccountModel from "../../DB/models/BankAccount.model.js";
import transactionsModel from "../../DB/models/Transactions.model.js";
import { transactionsTypeEnum } from "../../common/enum/transactions.type.enum.js";
import { transactionsStatusEnum } from "../../common/enum/transactionSttus.enum.js";
import { ErrorConflict } from "../../common/utils/globalErrorHandling.js";

export async function checkAccountOwner(account,userId) {
  const { accountNumber } = await find({
    model: banckAccountModel,
    filter: {
      userId,
    },
    option: {
      select: "accountNumber",
    },
  });
  if (!accountNumber.includes(account)) {
    ErrorConflict("you can not withDraw to this account");
  }
}

export async function getAccount(account) {
  const getAccount = await find({
    model: banckAccountModel,
    filter: {
      account,
    },
  });

  return getAccount
}

export async function checkAccountBalance({ getUserAcc, depositeAmount }) {
  if (getUserAcc.balance < depositeAmount) {
    await create({
      model: transactionsModel,
      data: {
        accountId: getUserAcc.id,
        type: transactionsTypeEnum.deposite,
        balanceBefore: getUserAcc.balance,
        amount: depositeAmount,
        balanceAfter: getUserAcc.balance,
        status: transactionsStatusEnum.failed,
      },
    });
    ErrorConflict("you dont have this amount of money");
  }
}

export async function updateAccountBalance({
  account,
  getUserAcc,
  depositeAmount,
  subject,
}) {
  const newAccountBalance = await findAndUpdate({
    model: banckAccountModel,
    filter: {
      account,
    },
    update: {
      balance:
        subject == transactionsTypeEnum.deposite
          ? `${getUserAcc.balance - depositeAmount}`
          : `${Number(getUserAcc.balance) + Number(depositeAmount)}`,
    },
    options: {
      new: true,
    },
  });
  return newAccountBalance;
}

export async function createTransaction({
  getUserAcc,
  depositeAmount,
  newAccountBalance,
  type,
}) {
  return await create({
    model: transactionsModel,
    data: {
      accountId: getUserAcc.id,
      type,
      amount: depositeAmount,
      balanceBefore: getUserAcc.balance,
      balanceAfter: newAccountBalance.balance,
      status: transactionsStatusEnum.pending,
    },
  });
}
