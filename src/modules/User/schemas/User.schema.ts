import Joi from "joi";

const getUserProfile = Joi.object({
  userId: Joi.number().required(),
});

export = { getUserProfile };
