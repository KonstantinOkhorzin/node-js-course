import { model } from 'mongoose';

import handleMongooseError from '../helpers/handleMongooseError.js';
import { userSchema } from '../schemas/auth.js';

// Handling errors for a POST request
userSchema.post('save', handleMongooseError);

const User = model('user', userSchema);

export default User;
