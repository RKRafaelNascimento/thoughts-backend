import { MAX_PAGE_SIZE } from "@/config";
import Joi from "joi";

const create = Joi.object({
  userId: Joi.number().required(),
  content: Joi.string().max(200).required(),
});

const getFeed = Joi.object({
  page: Joi.number().integer().default(1).messages({
    "number.base": '"page" must be a number.',
    "number.min": '"page" must be at least {#limit}.',
  }),
  pageSize: Joi.number().integer().max(MAX_PAGE_SIZE).default(10).messages({
    "number.base": '"pageSize" must be a number.',
    "number.max": '"pageSize" cannot be greater than {#limit}.',
  }),
});

export = { create, getFeed };
