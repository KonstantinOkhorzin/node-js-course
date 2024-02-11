import express from 'express';
import cors from 'cors';

import tasksRouter from './routes/api/tasks.js';

const app = express();

app.use(cors()); // Middleware for handling cross-origin HTTP requests
app.use(express.json()); // Middleware to parse incoming JSON data from the request body

app.use('/api/tasks', tasksRouter);

// Middleware for handling unmatched routes
app.use((req, res) => {
  res.status(404).json({
    message: 'Not found',
  });
});

export default app;
