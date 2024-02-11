import express from 'express';

import tasksController from '../../controllers/tasks.js';
import { addSchema, updateSchema } from '../../schemas/tasks.js';
import validateBody from '../../middlewares/validateBody.js';

const router = express.Router();

router.get('/', tasksController.getAll);

router.get('/:id', tasksController.getById);

router.post('/', validateBody(addSchema), tasksController.add);

router.patch('/:id', validateBody(updateSchema), tasksController.updateById);

router.delete('/:id', tasksController.deleteById);

export default router;
