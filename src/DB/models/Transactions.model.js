import mongoose, { Schema } from "mongoose";
import { transactionsTypeEnum } from "../../common/enum/transactions.type.enum.js";
import { transactionsStatusEnum } from "../../common/enum/transactionSttus.enum.js";

const transactionsSchema = mongoose.Schema(
  {
    accountId: {
      type: Schema.Types.ObjectId,
      ref: "bankAccounts",
    },
    type: {
      type: String,
      required: true,
      enum: Object.values(transactionsTypeEnum),
    },
    amount: {
      type: String,
      required: true,
    },
    balanceBefore: {
      type: String,
      required: true,
    },
    balanceAfter: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(transactionsStatusEnum),
    },
  },
  {
    timestamps: true,
    strictQuery: true,
    strict: true,
  },
);

const transactionsModel =
  mongoose.models.transactions ||
  mongoose.model("transactions", transactionsSchema);

export default transactionsModel;
