import express from 'express';

import tasksControllers from '../../controllers/tasks.js';
import { addSchema, updateSchema, updateCompletedSchema } from '../../schemas/tasks.js';
import validateBody from '../../middlewares/validateBody.js';
import isValidId from '../../middlewares/isValidId.js';

const router = express.Router();

router.get('/', tasksControllers.getTasks);

router.get('/:id', isValidId, tasksControllers.getTaskById);

router.post('/', validateBody(addSchema), tasksControllers.createTask);

router.patch(
  '/:id/completed',
  isValidId,
  validateBody(updateCompletedSchema),
  tasksControllers.updateTaskById
);

router.put('/:id', isValidId, validateBody(updateSchema), tasksControllers.updateTaskById);

router.delete('/:id', isValidId, tasksControllers.deleteTaskById);

export default router;
