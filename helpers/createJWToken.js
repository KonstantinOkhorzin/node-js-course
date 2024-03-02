import jwt from 'jsonwebtoken';

const createJWToken = user => {
  const payload = {
    id: user._id,
  };
  const { SECRET_KEY } = process.env;
  return jwt.sign(payload, SECRET_KEY, { expiresIn: '7d' });
};

export default createJWToken;
