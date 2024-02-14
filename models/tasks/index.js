import fs from 'fs/promises';
import path from 'path';
import { nanoid } from 'nanoid';

const __dirname = import.meta.dirname;
const tasksPath = path.join(__dirname, 'tasks.json');

export const getAllTasks = async () => {
  const data = await fs.readFile(tasksPath);
  return JSON.parse(data);
};

export const getTaskById = async id => {
  const tasks = await getAllTasks();
  const result = tasks.find(task => task.id === id);
  return result || null;
};

export const removeTask = async id => {
  const tasks = await getAllTasks();
  const index = tasks.findIndex(task => task.id === id);

  if (index === -1) {
    return null;
  }

  const [result] = tasks.splice(index, 1);
  await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));

  return result;
};

export const addTask = async text => {
  const newTask = { text, completed: false, id: nanoid() };
  const tasks = await getAllTasks();

  tasks.push(newTask);
  await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));

  return newTask;
};

export const updateTask = async (id, data) => {
  const tasks = await getAllTasks();
  const index = tasks.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  tasks[index] = { id, ...data };
  await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
  return tasks[index];
};

export const updateCompletedTask = async (id, data) => {
  const tasks = await getAllTasks();
  const index = tasks.findIndex(item => item.id === id);
  if (index === -1) {
    return null;
  }
  tasks[index] = { ...tasks[index], ...data };
  await fs.writeFile(tasksPath, JSON.stringify(tasks, null, 2));
  return tasks[index];
};
