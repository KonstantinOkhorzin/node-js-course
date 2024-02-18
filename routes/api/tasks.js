import express from 'express';

import tasksController from '../../controllers/tasks.js';
import { addSchema, updateSchema, updateCompletedSchema } from '../../schemas/tasks.js';
import validateBody from '../../middlewares/validateBody.js';
import isValidId from '../../middlewares/isValidId.js';

const router = express.Router();

router.get('/', tasksController.getAll);

router.get('/:id', isValidId, tasksController.getById);

router.post('/', validateBody(addSchema), tasksController.add);

router.patch(
  '/:id/completed',
  isValidId,
  validateBody(updateCompletedSchema),
  tasksController.updateById
);

router.put('/:id', isValidId, validateBody(updateSchema), tasksController.updateById);

router.delete('/:id', isValidId, tasksController.deleteById);

export default router;
