import GroupMessage from '../models/GroupMessage.js';
import { toggleEmojiReaction } from '../utils/reactionHelper.js';
import {
    SocketError,
    SOCKET_ERROR_CODES,
    handleSocketError,
} from '../utils/socketError.js';

export const handleGroupChatEvents = (io, socket) => {
    const { username } = socket.user;

    // Send a message into the group
    socket.on('group:send_message', async ({
        groupName, text
    } = {}) => {
        try {
            // Validate input
            if (!groupName || !text?.trim()) {
                throw new SocketError(
                    SOCKET_ERROR_CODES.BAD_REQUEST,
                    'Group name and message text are required'
                );
            }

            // Create a new message in database
            const newMessage = await GroupMessage.create({
                groupName,
                senderName: username,
                text,
                reactions: {},
            });

            // Send the message to everyone in the group
            io.to(groupName).emit('group:message_received', newMessage);
        } catch (error) {
            handleSocketError(socket, 'group:error', error);
        }
    });

    // Get chat history
    socket.on('group:get_history', async ({
        groupName, limit = 50,
    } = {}) => {
        try {
            // Validate input
            if (!groupName) {
                throw new SocketError(
                    SOCKET_ERROR_CODES.BAD_REQUEST,
                    'Group name is required'
                );
            }

            const fetchLimit = Math.min(
                Math.max(Number(limit) || 50, 1),
                100
            );

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
            handleSocketError(socket, 'group:error', error);
        }
    });

    // Toggle emoji reactions on a message
    socket.on('group:react', async ({
        messageId, groupName, emoji,
    } = {}) => {
        try {
            // Validate input
            if (!messageId || !groupName || !emoji) {
                throw new SocketError(
                    SOCKET_ERROR_CODES.BAD_REQUEST,
                    'Message ID, group name, and emoji are required'
                );
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
            handleSocketError(socket, 'group:error', error);
        }
    });
};

export const anonymizeUserMessages = async (username) => {
    await GroupMessage.updateMany(
        { senderName: username },
        { $set: { senderName: 'Anonymous' } }
    );
};