import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { server } from './app.js';

dotenv.config({ path: './src/config/.env' });

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectDB();

        server.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();