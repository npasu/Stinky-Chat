export const toggleEmojiReaction = async (
    Model, messageId, username, emoji
) => {
    const message = await Model.findById(messageId);

    // Validate message
    if (!message) {
        throw new Error('Message not found');
    }

    // Validate Input
    if (!username || !emoji) {
        throw new Error('Username and emoji are required');
    }

    // Get a copy of the users array for this emoji
    const userList = [...(message.reactions.get(emoji) || [])];
    const userIndex = userList.indexOf(username);

    // Toggle logic: remove if exists, add if not
    if (userIndex > -1) {
        userList.splice(userIndex, 1);
    } else {
        userList.push(username);
    }

    // Update user list of emoji
    if (userList.length === 0) {
        // Remove the key entirely if not exists
        message.reactions.delete(emoji);
    } else {
        message.reactions.set(emoji, userList);
    }

    await message.save();
    return message.reactions;
}