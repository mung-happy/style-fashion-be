import Joi from "joi";

const createVoucher = {
  body: Joi.object().keys({
    name: Joi.string().required().trim(),
    validFrom: Joi.date().required(),
    validTo: Joi.date().required().greater(Joi.ref("validFrom")).messages({
      "date.greater": "validTo must be greater than validFrom",
    }),
    discount: Joi.number().required(),
    minCartPrice: Joi.number().required(),
    quantity: Joi.number().required(),
    type: Joi.string().valid("percentage", "amount").required(),
    exclude_promotions: Joi.boolean().required(),
    active: Joi.boolean(),
  }),
};

const checkVoucher = {
  body: Joi.object().keys({
    code: Joi.string().required().trim(),
    cartPrice: Joi.number().required(),
  }),
};

const getVouchers = {
  query: Joi.object().keys({
    name: Joi.string(),
  }),
};
export { createVoucher, getVouchers, checkVoucher };