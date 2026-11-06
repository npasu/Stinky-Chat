import User from '../models/User.js';
import PrivateMessage from '../models/PrivateMessage.js';
import { toggleEmojiReaction } from '../utils/reactionHelper.js';
import {
    SocketError,
    SOCKET_ERROR_CODES,
    handleSocketError,
} from '../utils/socketError.js';

// Create private room name
const getPrivateRoomName = (senderName, receiverName) => {
    const names = [senderName, receiverName].sort();

    return `private:${JSON.stringify(names)}`;
}

export const handlePrivateChatEvents = (io, socket) => {
    const { username } = socket.user;

    // Send a message
    socket.on('private:send_message', async ({
        receiverName, text
    } = {}) => {
        try {
            // Validate input
            if ( !receiverName || !text?.trim() ) {
                throw new SocketError(
                    SOCKET_ERROR_CODES.BAD_REQUEST,
                    'receiver name and message text are required'
                );
            }

            // Find receiver
            const receiver = await User.findOne({
                username: receiverName,
            });

            if (!receiver) {
                throw new SocketError(
                    SOCKET_ERROR_CODES.NOT_FOUND,
                    'Receiver is not online'
                );
            }

            // Join the private room
            const privateRoomName = getPrivateRoomName(username, receiver.username);

            await socket.join(privateRoomName);
            await io.in(receiver.socketId).socketsJoin(privateRoomName);

            // Create a new message in database
            const newMessage = await PrivateMessage.create({
                receiverName,
                senderName: username,
                text,
                reactions: {},
            });

            // Send the message to receiver
            io.to(privateRoomName).emit('private:message_received', newMessage);
        } catch (error) {
            handleSocketError(socket, 'private:error', error);
        }
    });

    // Get chat history
    socket.on('private:get_history', async ({
        receiverName, limit = 50,
    } = {}) => {
        try {
            // Validate input
            if (!receiverName) {
                throw new SocketError(
                    SOCKET_ERROR_CODES.BAD_REQUEST,
                    'receiverName is required'
                );
            }

            // Join the room
            const privateRoomName = getPrivateRoomName(username, receiverName);

            await socket.join(privateRoomName);

            const fetchLimit = Math.min(
               Math.max(Number(limit) || 50, 1),
               100 
            );

            // Get history
            const history = await PrivateMessage
                .find({ 
                    $or: [
                        { senderName: username, receiverName }, // A -> B
                        { senderName: receiverName, receiverName: username }, // B -> A
                    ]
                 })
                .sort({ createdAt: -1 })
                .limit(fetchLimit);

            //Flip the array
            const sortedHistory = history.reverse();

            // Send the history back
            socket.emit('private:history_loaded', {
                receiverName,
                history: sortedHistory,
            });
        } catch (error) {
            handleSocketError(socket, 'private:error', error);
        }
    });

    // Toggle emoji reactions on a message
    socket.on('private:react', async ({
        messageId, emoji,
    } = {}) => {
        try {
            // Validate input
            if ( !messageId || !emoji) {
                throw new SocketError(
                    SOCKET_ERROR_CODES.BAD_REQUEST,
                    'Message ID and emoji are required'
                );
            }

            // Find message
            const message = await PrivateMessage.findById(messageId);

            if ( !message ) {
                throw new SocketError(
                    SOCKET_ERROR_CODES.NOT_FOUND,
                    'Message not found'
                );
            }

            // Only sender and receiver can react
            if ( message.senderName !== username && message.receiverName !== username ) {
                throw new SocketError(
                    SOCKET_ERROR_CODES.FORBIDDEN,
                    'You cannot react to this message'
                );                
            }
                
            // Update reactions using helper
            const updatedReactions = await toggleEmojiReaction(
                PrivateMessage,
                messageId,
                username,
                emoji,
            );

            // Find connected participants
            const users = await User.find({
                username: {
                    $in: [message.senderName, message.receiverName],
                },
            });

            const socketIds = users.map((user) => user.socketId);

            // Specify room name to send reaction
            const privateRoomName = getPrivateRoomName(message.senderName,message.receiverName);

            await socket.join(privateRoomName);
            await io.in(socketIds).socketsJoin(privateRoomName);

            // Broadcast the updated reactions message to both side
            io.to(privateRoomName).emit('private:reaction_updated', {
                messageId: message._id,
                reactions: Object.fromEntries(updatedReactions)
            });
        } catch (error) {
            handleSocketError(socket, 'private:error', error);
        }
    });
};
