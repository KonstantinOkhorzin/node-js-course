import { Schema, model } from 'mongoose';

import handleMongooseError from '../helpers/handleMongooseError.js';

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
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

// Handling errors for a POST request
taskSchema.post('save', handleMongooseError);

const Task = model('task', taskSchema);

export default Task;
