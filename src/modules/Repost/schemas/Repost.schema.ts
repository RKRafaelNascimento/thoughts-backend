import Joi from "joi";

const create = Joi.object({
  userId: Joi.number().required(),
  content: Joi.string().max(200).optional(),
  originalPostId: Joi.number().required(),
});

export = { create };
