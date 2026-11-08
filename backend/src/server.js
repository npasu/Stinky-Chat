
import dotenv from 'dotenv';
import mongoose from "mongoose";
import connectDB from './config/db.js';
import { server, io } from './app.js';
import { clearDatabase } from './utils/cleanup.js';

dotenv.config({ path: './src/config/.env' });

const PORT = process.env.PORT || 5000;

let isShuttingDown = false;

const startServer = async () => {
  try {
    await connectDB();

    // Clear old data from previous server instance
    await clearDatabase();

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

const gracefulShutdown = async (signal) => {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log(`\n${signal} received. Shutting down server...`);

  // Shutdown timeout
  const forceExit = setTimeout(() => {
    console.error("Shutdown timed out, forcing exit");
    process.exit(1);
  }, 15000);

  forceExit.unref();

  try {
    // Disconnect all Socket.IO clients
    io.disconnectSockets(true);

    // Close Socket.IO and HTTP server
    await new Promise((resolve) => {
      io.close(resolve);
    });

    // Clear all database collections
    await clearDatabase();

    // Disconnect MongoDB
    await mongoose.disconnect();

    console.log("Shutdown completed");
    clearTimeout(forceExit);
    process.exit(0);
  } catch (error) {
    console.error("Shutdown error:", error);
    process.exit(1);
  }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

startServer();
