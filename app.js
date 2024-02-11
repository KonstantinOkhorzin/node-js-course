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

// Error-handling middleware
app.use((error, req, res, next) => {
  const { status = 500, message = 'Server error' } = error;
  res.status(status).json({ message });
});

export default app;
