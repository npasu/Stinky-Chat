import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

import { setupSocketEvents } from './sockets/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Real-time Chat Server is running standardly.');
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
    },
});

setupSocketEvents(io);

export { app, server, io };