import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import Task from '../models/task.js';

const getTasks = async (req, res) => {
  const { _id: owner } = req.user;
  const tasks = await Task.find({ owner }, '-owner');
  res.json(tasks);
};

const getTaskById = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    throw HttpError(404);
  }

  res.json(task);
};

const createTask = async (req, res) => {
  const { _id: owner } = req.user;
  const newTask = await Task.create({ ...req.body, owner });
  res.status(201).json(newTask);
};

const updateTaskById = async (req, res) => {
  const { id } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

  if (!updatedTask) {
    throw HttpError(404);
  }

  res.json(updatedTask);
};

const deleteTaskById = async (req, res) => {
  const { id } = req.params;
  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deletedTask) {
    throw HttpError(404);
  }

  res.json(deletedTask);
  //or
  //res.json({ message: 'Delete success', });
  //or
  //res.status(204).send()
};

export default {
  getTasks: ctrlWrapper(getTasks),
  getTaskById: ctrlWrapper(getTaskById),
  createTask: ctrlWrapper(createTask),
  updateTaskById: ctrlWrapper(updateTaskById),
  deleteTaskById: ctrlWrapper(deleteTaskById),
};
