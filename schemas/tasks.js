import Joi from 'joi';

export const addSchema = Joi.object({
  text: Joi.string().required(),
});

export const updateSchema = Joi.object({
  text: Joi.string().required(),
  completed: Joi.boolean().required(),
});

export const updateCompletedSchema = Joi.object({
  completed: Joi.boolean().required(),
});