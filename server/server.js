import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js'; // adjust the path to your connectDB file
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from './routes/ShowRoutes.js';

import axios from 'axios';
import axiosRetry from 'axios-retry';
import bookingRouter from './routes/bookingRoutes.js';
import adminRouter from './routes/adminRoute.js';
import userRouter from './routes/userRoute.js';

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
await connectDB(); // Make sure you're using top-level await OR wrap in an async IIFE if not allowed


axiosRetry(axios, {
  retries: 3, // Number of retry attempts
  retryDelay: axiosRetry.exponentialDelay, // Wait time between retries
  retryCondition: (error) => {
    // Retry on network errors or 5xx status codes
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status >= 500;
  }
});

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware()) 
// Routes
app.get('/', (req, res) => {
  res.send('Server is Live!');
});
app.use('/api/inngest', serve({ client: inngest, functions }))
app.use('/api/show',showRouter)
app.use('/api/booking',bookingRouter)
app.use('/api/admin',adminRouter)
app.use('/api/user',userRouter)
// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
