import mongoose, { Schema } from "mongoose";
import { roleEnum } from "../../common/enum/role.enum.js";
import { banckAccountEnum } from "../../common/enum/bankAccount.enum.js";

const bankAccountsSchame = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    balance: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(banckAccountEnum),
    },
    accountNumber: {
      type: [String],
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    strictQuery: true,
    strict: true,
  },
);

const banckAccountModel =
  mongoose.models.bankAccounts ||
  mongoose.model("bankAccounts", bankAccountsSchame);

export default banckAccountModel;
