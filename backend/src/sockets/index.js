import User from '../models/User.js';
import { handleUserEvents } from './userHandler.js';
import { handleGroupEvents } from './groupHandler.js';
import { handlePrivateChatEvents } from './privateChatHandler.js';
import { handleGroupChatEvents } from './groupChatHandler.js';

export const setupSocketEvents = (io) => {
    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        handleUserEvents(io, socket);
        handleGroupEvents(io, socket);
        handlePrivateChatEvents(io, socket);
        handleGroupChatEvents(io, socket);

        socket.on('disconnect', async () => {
            await handleUserDisconnect(io, socket);
        });
    });
}