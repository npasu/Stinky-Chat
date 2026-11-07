import mongoose from 'mongoose';

const connectDB = async () => {
    mongoose.set('strictQuery', true);

    const conn = await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'chat-app',
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

export default connectDB;