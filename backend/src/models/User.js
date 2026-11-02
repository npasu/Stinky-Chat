import mongoose from 'mongoose';

// User Schema
const UserSchema = new mongoose.Schema(
    {
        // username
        username: {
            type: String,
            required: [true, 'Please add a name'],
            unique: true,
            trim: true,
        },

        // Socket ID
        socketId: {
            type: String,
            required: true,
        },

        // Avatar ID
        avatarId: {
            type: Number,
            default: 1,
            min: 1,
            max: 5,
        },
    },
    {
        // Timestamp for created at and updated at
        timestamps: true,
    }
);

export default mongoose.model('User', UserSchema);