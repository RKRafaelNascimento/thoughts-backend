import Joi from "joi";

const follow = Joi.object({
  followerId: Joi.number().required(),
  followedId: Joi.number().required(),
});

const unfollow = Joi.object({
  followerId: Joi.number().required(),
  followedId: Joi.number().required(),
});

export = { follow, unfollow };
