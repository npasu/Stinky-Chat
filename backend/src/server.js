import dotenv from 'dotenv';
import mongoose from "mongoose";
import connectDB from './config/db.js';
import { server, io } from './app.js';
import User from "./models/User.js";
import Group from './models/Group.js';
import GroupMessage from './models/GroupMessage.js';
import PrivateMessage from './models/PrivateMessage.js';

dotenv.config({ path: './src/config/.env' });

const PORT = process.env.PORT || 5000;

let isShuttingDown = false;

const clearAllData = async (label) => {
  const resultUser = await User.deleteMany({}).maxTimeMS(10000);
  console.log(`[${label}] Deleted ${resultUser.deletedCount} users`);

  const resultGroup = await Group.deleteMany({}).maxTimeMS(10000);
  console.log(`[${label}] Deleted ${resultGroup.deletedCount} groups`);

  const resultGroupMsg = await GroupMessage.deleteMany({}).maxTimeMS(10000);
  console.log(`[${label}] Deleted ${resultGroupMsg.deletedCount} group messages`);

  const resultPrivateMsg = await PrivateMessage.deleteMany({}).maxTimeMS(10000);
  console.log(`[${label}] Deleted ${resultPrivateMsg.deletedCount} private messages`);
};

const startServer = async () => {
  try {
    await connectDB();

    // Clear all old user data
    // await clearAllData("startup");

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
    await clearAllData("shutdown");

    await io.close();
    await mongoose.disconnect();

    console.log("Shutdown completed");
    process.exit(0);
  } catch (error) {
    console.error("Shutdown error:", error);
    process.exit(1);
  }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT"));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

startServer();