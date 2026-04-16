import mongoose, { Schema } from "mongoose";
import { roleEnum } from "../../common/enum/role.enum.js";
import { banckAccountEnum } from "../../common/enum/bankAccount.enum.js";

const beneficiarySchema = mongoose.Schema(
  {
    ownerUserId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    accountNumber: {
      type: String,
      ref: "bankAccounts",
      required: true,
    },
    bankName: {
      type: String,
    },
    nickName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    strictQuery: true,
    strict: true,
  },
);

const beneficiaryModel =
  mongoose.models.beneficiaries ||
  mongoose.model("beneficiaries", beneficiarySchema);

export default banckAccountModel;
