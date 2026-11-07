import User from '../models/User.js';
import Group from '../models/Group.js';
import GroupMessage from '../models/GroupMessage.js';
import PrivateMessage from '../models/PrivateMessage.js';

export const clearDatabase = async () => {
    await Promise.all([
        User.deleteMany({}),
        Group.deleteMany({}),
        GroupMessage.deleteMany({}),
        PrivateMessage.deleteMany({}),
    ]);

    console.log('Database cleared');
};

export const clearDatabaseIfNoUsers = async () => {
    const userCount = await User.countDocuments();

    if (userCount === 0) {
        await clearDatabase();
    }
};