import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js'; // adjust the path to your connectDB file
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
await connectDB(); // Make sure you're using top-level await OR wrap in an async IIFE if not allowed

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware()) 
// Routes
app.get('/', (req, res) => {
  res.send('Server is Live!');
});
app.use('/api/inngest', serve({ client: inngest, functions }))

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
