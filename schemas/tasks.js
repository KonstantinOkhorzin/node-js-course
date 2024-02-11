import Joi from 'joi';

export const addSchema = Joi.object({
  text: Joi.string().required(),
});

export const updateSchema = Joi.object({
  text: Joi.string(),
  completed: Joi.boolean(),
});
