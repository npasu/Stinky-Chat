import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
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
