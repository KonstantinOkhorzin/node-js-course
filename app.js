import express from 'express';
import cors from 'cors';

import tasksRouter from './routes/api/tasks.js';

const app = express();

app.use(cors());

app.use('/api/tasks', tasksRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

export default app;
