import { Schema, model } from 'mongoose';

import handleMongooseError from '../middlewares/handleMongooseError.js';

const taskSchema = new Schema(
  {
    text: {
      type: String,
      required: [true, 'Why no text?'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

// Handling errors for a POST request
taskSchema.post('save', handleMongooseError);

const Task = model('task', taskSchema);

export default Task;
