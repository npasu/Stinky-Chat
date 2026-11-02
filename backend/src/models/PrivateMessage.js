import mongoose from 'mongoose';

// Private Message Schema
const PrivateMessageSchema = new mongoose.Schema(
    {
        // Sender's Username
        senderName: {
            type: String,
            required: [true, 'Please add a sender name'],
            trim: true,
        },

        // Receiver's Username
        receiverName: {
            type: String,
            required: [true, 'Please add a receiver name'],
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

export default mongoose.model('PrivateMessage', PrivateMessageSchema);