import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import Task from '../models/task.js';

const getAll = async (_, res) => {
  const tasks = await Task.find({}, '-createdAt');
  res.json(tasks);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    throw HttpError(404, 'Not found');
  }

  res.json(task);
};

const add = async (req, res) => {
  const newTask = await Task.create(req.body);
  res.status(201).json(newTask);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

  if (!updatedTask) {
    throw HttpError(404, 'Not found');
  }

  res.json(updatedTask);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deletedTask = await Task.findByIdAndDelete(id);

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
