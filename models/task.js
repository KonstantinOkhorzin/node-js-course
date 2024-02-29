import { model } from 'mongoose';

import handleMongooseError from '../helpers/handleMongooseError.js';
import { taskSchema } from '../schemas/tasks.js';

// Handling errors for a POST request
taskSchema.post('save', handleMongooseError);

const Task = model('task', taskSchema);

export default Task;
