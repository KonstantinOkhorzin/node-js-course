import express from 'express';

import taskControllers from '../../controllers/tasks.js';
import { addSchema, updateSchema, updateCompletedSchema } from '../../schemas/tasks.js';
import validateBody from '../../middlewares/validateBody.js';
import isValidId from '../../middlewares/isValidId.js';
import authenticate from '../../middlewares/authenticate.js';

const router = express.Router();

router.get('/', authenticate, taskControllers.getAll);

router.get('/:id', authenticate, isValidId, taskControllers.getById);

router.post('/', authenticate, validateBody(addSchema), taskControllers.add);

router.patch(
  '/:id/completed',
  authenticate,
  isValidId,
  validateBody(updateCompletedSchema),
  taskControllers.updateById
);

router.put('/:id', authenticate, isValidId, validateBody(updateSchema), taskControllers.updateById);

router.delete('/:id', authenticate, isValidId, taskControllers.deleteById);

export default router;
