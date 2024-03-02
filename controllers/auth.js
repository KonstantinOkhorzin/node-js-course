import bcrypt from 'bcryptjs';

import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import createJWToken from '../helpers/createJWToken.js';
import User from '../models/user.js';

const register = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, 'Email already in use');
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });

  const token = createJWToken(newUser);

  await User.findByIdAndUpdate(newUser._id, { token });

  res.status(201).json({
    user: {
      email: newUser.email,
      name: newUser.name,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, 'Email or password invalid');
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, 'Email or password invalid');
  }

  const token = createJWToken(user);

  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    user: {
      email: user.email,
      name: user.name,
    },
    token,
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
