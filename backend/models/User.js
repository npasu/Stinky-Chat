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
        }
    },
    {
        // Timestamp for created at and updated at
        timestamps: true,
    }
);

export default mongoose.model('User', UserSchema);