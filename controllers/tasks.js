import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import Task from '../models/task.js';

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;
  const tasks = await Task.find({ owner }, '-createdAt -updatedAt', { skip, limit }).populate(
    'owner',
    'name email'
  );
  res.json(tasks);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);

  if (!task) {
    throw HttpError(404);
  }

  res.json(task);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const newTask = await Task.create({ ...req.body, owner });
  res.status(201).json(newTask);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(id, req.body, { new: true });

  if (!updatedTask) {
    throw HttpError(404);
  }

  res.json(updatedTask);
};

const deleteById = async (req, res) => {
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
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
