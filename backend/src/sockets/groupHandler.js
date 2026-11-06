import Group from '../models/Group.js';
import {
    SocketError,
    SOCKET_ERROR_CODES,
    handleSocketError,
} from '../utils/socketError.js';

export const handleGroupEvents = (io, socket) => {

    const { username } = socket.user;

    // const { anonymizeUserMessages } = require('./groupChatHandler');

    // Create a chat group (creator is initially the only member)
    socket.on('group:create', async({ groupName } = {}) => {
        try {
            if (!groupName?.trim()) {
                throw new SocketError(SOCKET_ERROR_CODES.BAD_REQUEST, 'Group name is required');
            }

            // Check if group already exists
            const existingGroup = await Group.findOne({ groupName: groupName});
            if (existingGroup) {
                throw new SocketError(SOCKET_ERROR_CODES.BAD_REQUEST, 'Group already exists');
            }

            // Create new group with the creator as the leader and sole member
            const newGroup = await Group.create({
                groupName: groupName,
                leaderName: username,
                members: [username]
            });

            // Join the socket room for the group
            socket.join(groupName);

            // Notify all users that a new group was created so they can update their lists
            io.emit('group:list_updated', newGroup);
            socket.emit('group:created', newGroup);

        } catch (error) {
            handleSocketError(socket, 'group:error', error);
        }
    });

    // Get a list of all existing chat groups (with member list)
    socket.on('group:get_list', async () => {
        try {
            const groups = await Group.find({});
            socket.emit('group:list_loaded', groups);
        } catch (error) {
            handleSocketError(socket, 'group:error', error);
        }
    });

    // Join a group chat
    socket.on('group:join', async({ groupName } = {}) => {
        try {
            if (!groupName) {
                throw new SocketError(SOCKET_ERROR_CODES.BAD_REQUEST, 'Group name is required');
            }

            const group = await Group.findOne({ groupName: groupName });
            if (!group) {
                throw new SocketError(SOCKET_ERROR_CODES.NOT_FOUND, 'Group not found');
            }

            // Add user to members if not already in it
            if (!group.members.includes(username)) {
                group.members.push(username);
                await group.save();
            }

            // Join the socket room
            socket.join(groupName);

            // Notify the group that a new user joined, and update lists globally
            io.to(groupName).emit('group:user_joined', { groupName, username });
            io.emit('group:list_updated', group);

        } catch (error) {
            handleSocketError(socket, 'group:error', error);
        }
    });

    // The group leader can only delete the group
    socket.on('group:delete', async ({ groupName } = {}) => {
        try {
            if (!groupName) {
                throw new SocketError(SOCKET_ERROR_CODES.BAD_REQUEST, 'Group name is required');
            }

            const group = await Group.findOne({ groupName: groupName });
            if (!group) {
                throw new SocketError(SOCKET_ERROR_CODES.NOT_FOUND, 'Group not found');
            }

            // Verify the requester is the group leader
            if (group.leaderName !== username) {
                throw new SocketError(SOCKET_ERROR_CODES.UNAUTHORIZED, 'Only the group leader can delete this group');
            }

            // Delete the group
            await Group.deleteOne({ groupName: groupName });

            // Make all current members leave the socket room
            const socketsInRoom = await io.in(groupName).fetchSockets();
            socketsInRoom.forEach(s => s.leave(groupName));

            // Notify all users that the group was deleted
            io.emit('group:deleted', { groupName });

        } catch (error) {
            handleSocketError(socket, 'group:error', error);
        }
    });

    socket.on('disconnect', async () => {
        try {
            if (!username) return;

            const userGroups = await Group.find({members: username});

            for (const group of userGroups) {

                // Delete member from group's members
                group.members = group.members.filter(member => member !== username);

                // await anonymizeUserMessages(groupName, disconnectedUsername);

                // io.to(groupName).emit("group:messages_anonymized");

                if (group.members.length === 0) {
                    
                    // Delete group when no members left
                    await Group.deleteOne({ _id: group._id });
                    io.emit('group:deleted', { groupName: group.groupName });
                } else {

                    // Change leader when Group leader disconnected
                    if (group.leaderName === username) {
                        group.leaderName = group.members[0];
                    }

                    await group.save();

                    // Notify the group that a leader changed, and update lists globally
                    io.to(group.name).emit('group:user_left', {
                        groupName: group.groupName,
                        username,
                        newLeader: group.leaderName
                    });

                    io.emit('group:list_updated', group);
                }
            }
        } catch (error) {
            console.error('Error during group cleanup on disconnect:', error);
        }
    }); 
};