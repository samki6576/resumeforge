const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log('🔄 Connecting to MongoDB Atlas...');
        
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
        });
        
        console.log('✅ MongoDB Connected Successfully!');
        console.log('📊 Database:' );
        console.log('🌐 Host: ');
        console.log('🔢 Port:' );
        console.log('🚀 Server is ready!');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
