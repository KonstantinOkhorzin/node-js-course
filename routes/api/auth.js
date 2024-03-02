import express from 'express';

import { registerSchema, loginSchema } from '../../schemas/auth.js';
import validateBody from '../../middlewares/validateBody.js';
import authControllers from '../../controllers/auth.js';

const router = express.Router();

// signup
router.post('/register', validateBody(registerSchema), authControllers.register);

// signin
router.post('/login', validateBody(loginSchema), authControllers.login);

export default router;
