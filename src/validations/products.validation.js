import Joi from "joi";
import { objectId } from "./custom.validation.js";

export const getProducts = {
  query: Joi.object().keys({
    categories:Joi.string(),
    search: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};
export const getProductDetail = {
  params: Joi.object().keys({
    identifier: Joi.required(),
  }),
};

export const createProduct = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    thumbnail: Joi.string().required(),
    categories: Joi.array().min(1).max(10).items(Joi.string().custom(objectId)),
    attributes: Joi.array()
      .min(1)
      .max(20)
      .items(
        Joi.object({
          name: Joi.string().required(),
          price: Joi.number().required(),
          stock: Joi.number().required(),
          discount: Joi.number().allow(null, "").default(0), // Allow null or empty string
          image: Joi.string().allow(null, ""), // Allow null or empty string
        })
      )
      .required(), // Ensure attributes is always an array, even if empty
    gallery: Joi.array().max(5).items(Joi.string().allow(null, "")), // Allow empty strings in array
    description: Joi.string().required(),
    video: Joi.string().allow(null, ""), // Allow null or empty string
  }),
};

export const updateProduct = {
  params: Joi.object().keys({
    id: Joi.required(),
  }),
  body: Joi.object().keys({
    name: Joi.string(),
    thumbnail: Joi.string(),
    attributes: Joi.array()
      .min(1)
      .max(20)
      .items(
        Joi.object({
          name: Joi.string().required(),
          price: Joi.number().required(),
          stock: Joi.number().required(),
          discount: Joi.number().allow(null, "").default(0), // Allow null or empty string
          image: Joi.string().allow(null, ""), // Allow null or empty string
        })
      )
      .required(),
    categories: Joi.array().min(1).max(10).items(Joi.string().custom(objectId)),
    gallery: Joi.array().max(5).items(Joi.string().allow(null, "")), // Allow empty strings in array
    description: Joi.string(),
    attributes: Joi.array()
      .min(1)
      .max(20)
      .items(
        Joi.object({
          name: Joi.string().required(),
          price: Joi.number().required(),
          stock: Joi.number().required(),
          discount: Joi.number().allow(null, "").default(0), // Allow null or empty string
          image: Joi.string().allow(null, ""), // Allow null or empty string
        })
      ),
    video: Joi.string().allow(null, ""), // Allow null or empty string
  }),
};

export const deleteProduct = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};
