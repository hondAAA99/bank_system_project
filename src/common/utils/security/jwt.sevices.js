import jwt from "jsonwebtoken";
import * as SECRET from "../../../config/config.services.js";

export const genToken = ({ data, secret, opts }) => {
  const token = jwt.sign(data, secret, opts);
  return token;
};

export const decodeUserAccesToken = (token) => {
  const verify = jwt.verify(token, SECRET.SECRET_USER_ACCESS_TOKEN);
  return verify;
};

export const decodeUserRefreshToken = (token) => {
  const verify = jwt.verify(token, SECRET.SECRET_USER_REFRESH_TOKEN);
  return verify;
};
