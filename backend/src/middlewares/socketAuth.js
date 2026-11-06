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

        // No anonymous as username
        if (username.toLowerCase() === 'anonymous') {
            const error = new Error('This username is not allowed');
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
