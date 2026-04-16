import { hashSync, compareSync } from "bcrypt";
import { SALT } from "../../../config/config.services.js";

export function hash(data) {
  return hashSync(data, SALT);
}

export function compare({ plainText, hashedText }) {
  return compareSync(plainText, hashedText);
}
