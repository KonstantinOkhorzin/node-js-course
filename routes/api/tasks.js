import express from 'express';
import HttpError from '../../helpers/HttpError.js';
import {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  removeTask,
} from '../../models/tasks/index.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const tasks = await getAllTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await getTaskById(id);

    if (!task) {
      throw HttpError(404, 'Not found');
    }

    res.json(task);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { text } = req.body;
    const newTask = await addTask(text);

    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const updatedTask = await updateTask(id, body);

    if (!updatedTask) {
      throw HttpError(404, 'Not found');
    }

    res.json(updatedTask);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedTask = await removeTask(id);

    if (!deletedTask) {
      throw HttpError(404, 'Not found');
    }

    res.json(deletedTask);
    //or
    //res.json({ message: 'Delete success', });
    //or
    //res.status(204).send()
  } catch (error) {
    next(error);
  }
});

export default router;
