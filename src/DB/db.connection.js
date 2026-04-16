import mongoose from "mongoose";
import { ErrorInteralServerError } from "../common/utils/globalErrorHandling.js";
import { DB_NAME, DB_URI } from "../config/config.services.js";

const DBconnection = async () => {
  await mongoose
    .connect(`${DB_URI}/${DB_NAME}`)
    .then(() => {
      console.log("connected to dataBase");
    })
    .catch((err) => {
      ErrorInteralServerError("error when connecting to database");
    });
};
export default DBconnection;
