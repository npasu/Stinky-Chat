<<<<<<< HEAD
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
||||||| 3b21f02
=======
import User from '../models/User.js';
import { SOCKET_ERROR_CODES } from '../utils/socketError.js';

export const socketAuth = async (socket, next) => {
    try {
        const { auth, headers } = socket.handshake;

        // Get username from client handshake
        const username = (auth?.username || headers?.username)?.trim();

        // Validate username
        if (!username) {
            const error = new Error('Username is required');
            error.data = { code: SOCKET_ERROR_CODES.BAD_REQUEST };
            return next(error);
        }

        // Get avatar id (auth keeps its type, header is always a string)
        const rawAvatarId = auth?.avatarId ?? headers?.avatarid;

        const hasAvatarId =
            rawAvatarId !== undefined &&
            rawAvatarId !== null &&
            String(rawAvatarId).trim() !== '';

        const avatarId = hasAvatarId ? Number(rawAvatarId) : undefined;

        // Validate avatarId only when provided
        if (hasAvatarId) {
            if (!Number.isInteger(avatarId) || avatarId < 1 || avatarId > 5) {
                const error = new Error('avatarId must be an integer between 1 and 5');
                error.data = { code: SOCKET_ERROR_CODES.BAD_REQUEST };
                return next(error);
            }
        }

        // Create user in database (avatarId only included when provided)
        const user = await User.create({
            username,
            socketId: socket.id,
            ...(hasAvatarId && { avatarId }),
        });

        socket.user = user;
        next();
    } catch (error) {
        console.error('socketAuth error:', error);

        // Handle duplicate username
        if (error.code === 11000) {
            const authError = new Error('Username is already in use');
            authError.data = { code: SOCKET_ERROR_CODES.CONFLICT };
            return next(authError);
        }

        // Handle unexpected errors
        const authError = new Error('Authentication failed');
        authError.data = { code: SOCKET_ERROR_CODES.INTERNAL_SERVER_ERROR };
        next(authError);
    }
};
>>>>>>> origin
