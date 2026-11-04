import GroupMessage from '../models/GroupMessage.js';
import { toggleEmojiReaction } from '../utils/reactionHelper.js';


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
            socket.emit('group:error', {
                message: 'Failed to send message',
                error: error.message,
            });
        }
    });

    // Get chat history
    socket.on('group:get_history', async ({
        groupName, limit = 50,
    }) => {
        try {
            const fetchLimit = Math.min(Number(limit) || 50, 100);

            // Get history
            const history = await GroupMessage
                .find({ groupName })
                .sort({ createdAt: -1 })
                .limit(fetchLimit);

            // Flip the array
            const sortedHistory = history.reverse();

            // Send the history back
            socket.emit('group:history_loaded', {
                groupName,
                history: sortedHistory,
            });
        } catch (error) {
            socket.emit('group:error', {
                message: 'Failed to load history',
                error: error.message,
            });
        }
    });

    // Toggle emoji reactions on a message
    socket.on('group:react', async ({
        messageId, groupName, emoji,
    }) => {
        try {
            const username = socket.user.username;

            // Validate input
            if (!messageId || !groupName || !emoji) {
                throw new Error('Missing required fields');
            }

            // Update reactions using helper
            const updatedReactions = await toggleEmojiReaction(
                GroupMessage,
                messageId,
                username,
                emoji,
            );

            // Broadcast the updated reactions message to all group members
            io.to(groupName).emit('group:reaction_updated', {
                messageId,
                reactions: updatedReactions,
            });
        } catch (error) {
            socket.emit('group:error', {
                message: 'Failed to update reaction',
                error: error.message,
            });
        }
    });
};