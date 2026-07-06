require('dotenv').config();
const mongoose = require('mongoose');

console.log('🔄 Testing MongoDB connection...');
console.log('📡 Connection string:', process.env.MONGODB_URI.replace(/:[^:]*@/, ':****@'));

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000,
    family: 4
})
.then(() => {
    console.log('✅ Connected successfully!');
    console.log('📊 Database:', mongoose.connection.name);
    console.log('🌐 Host:', mongoose.connection.host);
    process.exit(0);
})
.catch((err) => {
    console.error('❌ Connection failed:', err.message);
    console.error('📝 Error details:', err);
    process.exit(1);
});
