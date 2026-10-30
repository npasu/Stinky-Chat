const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        // Add database name to connection string
        dbName: 'chat-app',
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB;
