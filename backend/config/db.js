const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://essanhajimaryam10:7jYvmRt9Pnw2Jc9n@cluster0.ie7haqb.mongodb.net/") 
    
    console.log("connected successfully");
  } catch (error) {
    console.log("error with connecting with the DB ", error);
  }
};

module.exports = connectDB;