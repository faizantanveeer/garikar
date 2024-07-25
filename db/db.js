const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/garikar'; 

mongoose.connect(dbURI, {
  serverSelectionTimeoutMS: 5000, // 5 seconds
  socketTimeoutMS: 45000 // 45 seconds
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(`Initial MongoDB connection error: ${err}`));


mongoose.connection.on('error', err => {
  console.error(`MongoDB connection error: ${err}`);
});