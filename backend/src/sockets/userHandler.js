import User from "../models/User.js";
import {
    SocketError,
    SOCKET_ERROR_CODES,
    handleSocketError,
} from "../utils/socketError.js";
import { leaveGroups } from "./groupHandler.js";
import { deletePrivateChat } from "./privateChatHandler.js";

export const handleUserEvents = (io, socket) => {
    const { username } = socket.user;

    // Get current user's profile
    socket.on("user:get_profile", async () => {
        try {
            const user = await User.findById(socket.user._id).select("-socketId");

            if (!user) {
                throw new SocketError(SOCKET_ERROR_CODES.NOT_FOUND, "User not found");
            }

            console.log("User Profile:", user);

            // Send profile back to the requesting user
            socket.emit("user:profile_loaded", user);
        } catch (error) {
            handleSocketError(socket, "user:error", error);
        }
    });

    // Get user data from username
    socket.on("user:get_profile_by_username", async ({ username: targetUsername }) => {
        try {
            if (!targetUsername) {
                throw new SocketError(SOCKET_ERROR_CODES.BAD_REQUEST, "Username is required");
            }

            const targetUser = await User.findOne({ username: targetUsername }).select("-socketId");

            if (!targetUser) {
                throw new SocketError(SOCKET_ERROR_CODES.NOT_FOUND, "User profile not found");
            }

            console.log(`Fetched Profile for ${targetUsername}:`, targetUser);

            socket.emit("user:profile_by_username_loaded", targetUser);
        } catch (error) {
            handleSocketError(socket, "user:error", error);
        }
    });

    // Notify everyone that this user is online
    io.emit("user:online", {
        username,
    });

    // Get all online users
    socket.on("user:get_online_users", async () => {
        try {
            const users = await User.find()
                .sort({ username: 1 });

            console.log("Online users: ", users);

            socket.emit("user:online_users_loaded", users);
        } catch (error) {
            handleSocketError(socket, "user:error", error);
        }
    });
};

export const handleUserDisconnect = async (io, socket) => {
    try {
        const username = socket.user?.username;

        if (!socket.user?._id) return;

        // Leave group
        await leaveGroups(io, socket, username);

        // Delete private chat
        await deletePrivateChat(username);

        // Delete user from database
        await User.deleteOne({
            _id: socket.user._id,
            socketId: socket.id,
        });

        console.log(`User disconnected: ${username}`);

        // Notify everyone that this user went offline
        io.emit('user:offline', { username });

    } catch (error) {
        console.error('User disconnect error:', error);
    }
};