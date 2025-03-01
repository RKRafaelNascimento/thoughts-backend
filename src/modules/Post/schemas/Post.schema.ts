import Joi from "joi";

const create = Joi.object({
  userId: Joi.number().required(),
  content: Joi.string().max(200).required(),
});

export = { create };
