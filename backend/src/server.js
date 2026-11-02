import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import { setupSocketEvents } from './sockets/index.js';

dotenv.config({ path: './src/config/.env' });

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (req, res) => {
    res.send('Real-time Chat Server is running standardly.');
});

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // URL frontend
        methods: ['GET', 'POST'],
    },
});

setupSocketEvents(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});