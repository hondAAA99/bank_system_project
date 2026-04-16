import userModel from "../../../DB/models/user.model.js";
import * as DB from "../../../DB/DB.services.js";
import {
  SECRET_USER_ACCESS_TOKEN,
  TOKEN_PREFIX,
} from "../../../config/config.services.js";
import jwt, { decode } from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  let authorization = req.headers.authorization;

  let [prefix, token] = authorization.split(" ");

  if (prefix != TOKEN_PREFIX)
    throw new Error("invalide Token*1", { cuase: 400 });

  const decoded = jwt.verify(token, SECRET_USER_ACCESS_TOKEN);
  const { userId, jti } = decoded;

  let user = await DB.findById({ model: userModel, Id : userId });
  if (!user) throw new Error("cannot find the user", { cause: 503 });

  req.user = user;
  req.decoded = decoded;
  req.token = token;
  next();
};
