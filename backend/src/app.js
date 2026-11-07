import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import { socketAuth } from './middlewares/socketAuth.js';

import { setupSocketEvents } from './sockets/index.js';

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
}));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Real-time Chat Server is running standardly.');
});

app.get('/health', (req, res) => {
    const isDatabaseConnected = mongoose.connection.readyState === 1;

    res.status(isDatabaseConnected ? 200 : 503).json({
        status: isDatabaseConnected ? 'OK' : 'ERROR',
        server: 'running',
        database: isDatabaseConnected ? 'connected' : 'disconnected',
    });
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: allowedOrigins,
        methods: ['GET', 'POST'],
    },
});

// Socket authentication middleware
io.use(socketAuth);

// Register socket events
setupSocketEvents(io);

export { app, server, io };
