import express from 'express';
import cors from 'cors';

import tasksRouter from './routes/api/tasks.js';

const app = express();
const port = 3000;

app.use(cors());

app.use('/api/tasks', tasksRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
