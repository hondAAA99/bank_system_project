import Joi from "joi";

// export const getAllMyTransactionsScheam = {
//   params: Joi.object({
//     skip: Joi.required(),
//     limit: Joi.required(),
//   }).required(),
// };

export const depostAndWithDrawSchmea = Joi.object({
  body: Joi.object({
    accountNumber: Joi.string().required(),
    depositeAmount: Joi.string().required(),
  }).required(),
});
