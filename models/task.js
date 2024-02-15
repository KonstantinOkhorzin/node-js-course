import { Schema, model } from 'mongoose';

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

const Task = model('task', taskSchema);

export default Task;
