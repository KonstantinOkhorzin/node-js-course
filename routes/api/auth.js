import express from 'express';

import { registerSchema } from '../../schemas/auth.js';
import validateBody from '../../middlewares/validateBody.js';
import authControllers from '../../controllers/auth.js';

const router = express.Router();

// signup
router.post('/register', validateBody(registerSchema), authControllers.register);

export default router;
