import mongoose from 'mongoose';

export const ConnectToMongoDb = async () => {
    try {
        const dbUri = 'mongodb://localhost:27017/test'; 
        await mongoose.connect(dbUri);
        console.log('MongoDB connected successfully');
        return 1;
    } catch (error) {
        console.error('MongoDB connection error:', error);
        return -1; 
    }


};



