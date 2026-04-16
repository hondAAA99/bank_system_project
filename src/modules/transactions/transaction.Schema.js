import Joi from "joi";

// export const getAllMyTransactionsScheam = {
//   params: Joi.object({
//     skip: Joi.required(),
//     limit: Joi.required(),
//   }).required(),
// };

export const depostAndWithDrawSchmea = Joi.object({
  body: Joi.object({
    account: Joi.string().required(),
    depositeAmount: Joi.number().positive().required(),
  }).required(),
});

export const transferSchmea = Joi.object({
  body: Joi.object({
    account: Joi.string().required(),
    beneficiary: Joi.string().required(),
    depositeAmount: Joi.number().positive().required(),
  }).required(),
});
