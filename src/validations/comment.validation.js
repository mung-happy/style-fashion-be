import Joi from "joi";
import { objectId } from "./custom.validation.js";

const createComment = {
  body: Joi.object().keys({
    productsId: Joi.string().required().custom(objectId),
    userId: Joi.string().required().custom(objectId),
    content: Joi.string().required(),
    like: Joi.number(),
    parentCommentId: Joi.optional().custom(objectId),
  }),
};
const updateComment = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    content: Joi.string().required(),
  }),
};
const deleteComment = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};
const getCommentByProductId = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
};
export { createComment, updateComment, deleteComment, getCommentByProductId };
