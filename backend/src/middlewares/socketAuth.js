import User from '../models/User.js';
import {
    SOCKET_ERROR_CODES,
} from '../utils/socketError.js';

export const socketAuth = async (socket, next) => {
    try {
        // Get username from client handshake
        const username = (socket.handshake.auth?.username || socket.handshake.headers?.username)?.trim();

        // Validate username
        if (!username) {
            const error = new Error('Username is required');
            error.data = {
                code: SOCKET_ERROR_CODES.BAD_REQUEST,
            };

            return next(error);
        }

        // Create user in database
        const user = await User.create({
            username,
            socketId: socket.id,
        });

        // Attach user information to socket
        socket.user = user;

        next();
    } catch (error) {
        // Handle duplicate username
        if (error.code === 11000) {
            const authError = new Error(
                'Username is already in use'
            );

            authError.data = {
                code: SOCKET_ERROR_CODES.CONFLICT,
            };

            return next(authError);
        }

        // Handle unexpected errors
        const authError = new Error(
            'Authentication failed'
        );

        authError.data = {
            code: SOCKET_ERROR_CODES.INTERNAL_SERVER_ERROR,
        };

        next(authError);
    }
}