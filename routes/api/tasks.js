import express from 'express';
import tasks from '../../db/tasks.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(tasks);
});

export default router;
