import GroupMessage from '../models/GroupMessage.js';

export const handleGroupChatEvents = (io, socket) => {
    
    // Send a message into the group
    socket.on('group:send_message', async ({
        groupName, senderName, text
    }) => {
        try {
            // Create a new message in database
            const newMessage = await GroupMessage.create({
                groupName,
                senderName,
                text,
                reactions: {},
            });

            // Send the message to everyone in the group
            io.to(groupName).emit('group:message_received', newMessage);
        } catch (error) {
            socket.emit('groupซerror', {
                message: 'Failed to send message',
                error: error.message,
            });
        }
    });
};