import express from 'express';

import tasksController from '../../controllers/tasks.js';

const router = express.Router();

router.get('/', tasksController.getAll);

router.get('/:id', tasksController.getById);

router.post('/', tasksController.add);

router.patch('/:id', tasksController.updateById);

router.delete('/:id', tasksController.deleteById);

export default router;
