import mongoose from 'mongoose';

// Group Schema
const GroupSchema = new mongoose.Schema(
    {
        // Group Name
        groupName: {
            type: String,
            required: [true, 'Please add a group name'],
            trim: true,
        },

        // Leader's Username
        leaderName: {
            type: String,
            required: [true, 'Please add a leader name'],
            trim: true,
        },

        // Array of member usernames
        members: [
            {
                type: String,
                required: true,
                trim: true,
            },
        ],
    },
    {
        // Timestamp for created at and updated at
        timestamps: true,
    }
);

export default mongoose.model('Group', GroupSchema);