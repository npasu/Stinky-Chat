import dotenv from 'dotenv';
import mongoose from "mongoose";
import connectDB from './config/db.js';
import { server, io } from './app.js';
import User from "./models/User.js";

dotenv.config({ path: './src/config/.env' });

const PORT = process.env.PORT || 5000;

let isShuttingDown = false;

const clearAllUsers = async (label) => {
  const result = await User.deleteMany({}).maxTimeMS(10000);
  console.log(`[${label}] Deleted ${result.deletedCount} users`);
};

const startServer = async () => {
    try {
        await connectDB();

        // Clear all old user data
        // await clearAllUsers("startup");

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
    // Cut all socket (Prevent create user during delete)
    io.disconnectSockets(true);

    // Clear all user data
    await clearAllUsers("shutdown");

    await io.close();
    await mongoose.disconnect();

    console.log("Shutdown completed");
    process.exit(0);
  } catch (error) {
    console.error("Shutdown error:", error);
    process.exit(1);
  }
};

// process.on("SIGINT", () => gracefulShutdown("SIGINT"));
// process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

startServer();