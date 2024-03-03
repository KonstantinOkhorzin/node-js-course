import express from 'express';

import tasksControllers from '../../controllers/tasks.js';
import { addSchema, updateSchema, updateCompletedSchema } from '../../schemas/tasks.js';
import validateBody from '../../middlewares/validateBody.js';
import isValidId from '../../middlewares/isValidId.js';
import authenticate from '../../middlewares/authenticate.js';

const router = express.Router();

router.get('/', authenticate, tasksControllers.getTasks);

router.get('/:id', authenticate, isValidId, tasksControllers.getTaskById);

router.post('/', authenticate, validateBody(addSchema), tasksControllers.createTask);

router.patch(
  '/:id/completed',
  authenticate,
  isValidId,
  validateBody(updateCompletedSchema),
  tasksControllers.updateTaskById
);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(updateSchema),
  tasksControllers.updateTaskById
);

router.delete('/:id', authenticate, isValidId, tasksControllers.deleteTaskById);

export default router;
