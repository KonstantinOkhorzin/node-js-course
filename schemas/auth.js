import Joi from 'joi';
import { Schema } from 'mongoose';

const emailRegexp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const validatePassword = password => {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};

export const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      match: emailRegexp,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      default: '',
    },
  },
  { versionKey: false, timestamps: true }
);

export const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string()
    .custom((value, helpers) => {
      if (!validatePassword(value)) {
        return helpers.message(
          'Password must contain at least 8 characters including uppercase, lowercase, digit, and special character.'
        );
      }
      return value;
    })
    .required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string()
    .custom((value, helpers) => {
      if (!validatePassword(value)) {
        return helpers.message(
          'Password must contain at least 8 characters including uppercase, lowercase, digit, and special character.'
        );
      }
      return value;
    })
    .required(),
});
