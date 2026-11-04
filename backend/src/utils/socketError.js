export const SOCKET_ERROR_CODES = {
    BAD_REQUEST: 'BAD_REQUEST',
    UNAUTHORIZED: 'UNAUTHORIZED',
    FORBIDDEN: 'FORBIDDEN',
    NOT_FOUND: 'NOT_FOUND',
    INTERNAL_SERVER_ERROR: 'INTERNAL_SERVER_ERROR',
};

export class SocketError extends Error {
    constructor(code, message) {
        super(message);

        this.name = 'SocketError';
        this.code = code;
    }
}

export const handleSocketError = (socket, event, error) => {
    const isSocketError = error instanceof SocketError;

    socket.emit(event, {
        code: isSocketError
            ? error.code
            : SOCKET_ERROR_CODES.INTERNAL_SERVER_ERROR,
        message: isSocketError
            ? error.message
            : 'Internal server error',
    });
};