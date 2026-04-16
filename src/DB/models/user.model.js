import mongoose, { Schema } from "mongoose";
import { roleEnum } from "../../common/enum/role.enum.js";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(roleEnum),
    },
  },
  {
    timestamps: true,
    strictQuery: true,
    strict: true,
    toObject: {},
    toJSON: {},
  },
);

userSchema
  .virtual("userName")
  .set(function (value) {
    const [fn, ln] = value.split(" ");
    this.firstName = fn;
    this.lastName = ln;
  })
  .get(() => {
    return this.firstName + " " + this.lastName;
  });

const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;
