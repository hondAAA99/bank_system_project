import { v4 as uuidv4 } from "uuid";
import userModel from "../../DB/models/user.model.js";
import * as DB from "../../DB/DB.services.js";
import * as jwtServices from "../../common/utils/security/jwt.sevices.js";
import * as SECRET from "../../config/config.services.js";
import { hash } from "../../common/utils/security/hash.securety.js";
export const findUser = async (filter = {}) => {
  const user = await DB.find({
    model: userModel,
    filter,
  });

  return user;
};

export function generateAccessAndRefreshTokens(
  user,
  secretAccess = SECRET.SECRET_USER_ACCESS_TOKEN,
  secretRefresh = SECRET.SECRET_USER_REFRESH_TOKEN,
) {
  let accessToken = jwtServices.genToken({
    data: {
      userId: user._id.toString(),
      userRole: user.role,
      jti: uuidv4(),
    },
    secret: secretAccess,
    opts: {
      expiresIn: "5m",
    },
  });

  let refreshToken = jwtServices.genToken({
    data: {
      userId: user._id.toString(),
      userRole: user.role,
      jti: uuidv4(),
    },
    secret: secretRefresh,
    opts: {
      expiresIn: "10d",
    },
  });

  return { accessToken, refreshToken };
}
