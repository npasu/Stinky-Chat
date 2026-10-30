import mongoose from 'mongoose';

// Group Message Schema
const groupMessageSchema = new mongoose.Schema(
    {
        // Group's ID
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
            required: true
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

        // Emoji Reactions: { "👍": ["Alice", "Bob"] }
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