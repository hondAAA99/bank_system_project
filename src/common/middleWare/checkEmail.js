import { find } from "../../DB/DB.services.js";
import userModel from "../../DB/models/user.model.js";

export const checkEmail = async (req, res, next) => {
  const { email } = req.body;
  let emailExsits = await find({ model: userModel, filter: { email } });

  if (emailExsits) {
    throw new Error("this email is not unique*");
  }

  next();
};
