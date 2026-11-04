import mongoose from 'mongoose';

// Group Message Schema
const groupMessageSchema = new mongoose.Schema(
    {
        // Group's name
        groupName: {
            type: String,
            required: [true, 'Please add a group name'],
            trim: true,
        },

        // Sender's Username
        senderName: {
            type: String,
            default: 'Anonymous',
            trim: true,
        },

        // Message Content
        text: {
            type: String,
            required: [true, 'Please add message text'],
        },

        // Emoji Reactions: { "like": ["Alice", "Bob"] }
        reactions: {
            type: Map,
            of: [String],
            default: {},
        },
    },
    {
        // Timestamp for created at and updated at
        timestamps: true,
    }
);

export default mongoose.model('GroupMessage', groupMessageSchema);