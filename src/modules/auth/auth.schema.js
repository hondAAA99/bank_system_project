import Joi from "joi";

export const registerSchema = Joi.object({
  body: Joi.object({
    userName: Joi.string().min(4).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    cpassword: Joi.string().valid(Joi.ref("password")).required(),
  }),
}).required();

export const loginSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}).required();
