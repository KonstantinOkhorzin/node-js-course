import Joi from 'joi';
import { Schema } from 'mongoose';

export const taskSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'Why no text?'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

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
