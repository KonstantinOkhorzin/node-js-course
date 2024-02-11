import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import { addSchema, updateSchema } from '../schemas/tasks.js';
import {
  getAllTasks,
  getTaskById,
  addTask,
  updateTask,
  removeTask,
} from '../models/tasks/index.js';

const getAll = async (req, res) => {
  const tasks = await getAllTasks();
  res.json(tasks);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const task = await getTaskById(id);

  if (!task) {
    throw HttpError(404, 'Not found');
  }

  res.json(task);
};

const add = async (req, res) => {
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { text } = req.body;
  const newTask = await addTask(text);

  res.status(201).json(newTask);
};

const updateById = async (req, res) => {
  const { body } = req;
  const { error } = updateSchema.validate(body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const { id } = req.params;
  const updatedTask = await updateTask(id, body);

  if (!updatedTask) {
    throw HttpError(404, 'Not found');
  }

  res.json(updatedTask);
};

const deleteById = async (req, res) => {
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
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
