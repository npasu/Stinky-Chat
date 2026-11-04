import { handleUserEvents } from './userHandler.js';
import { handleGroupEvents } from './groupHandler.js';
import { handleChatEvents } from './chatHandler.js';

export const setupSocketEvents = (io) => {
    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        handleUserEvents(io, socket);
        handleGroupEvents(io, socket);
        handleChatEvents(io, socket);

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}