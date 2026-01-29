const mongoose = require('mongoose');

const connectDB = async (url) => {
    if (!url) {
        console.error("MongoDB URI is missing! Please check your config.env file.");
        process.exit(1);
    }
    try {
        await mongoose.connect(url); // بدون useNewUrlParser أو useUnifiedTopology
        console.log("Database connected successfully");
    } catch (err) {
        console.error("DB connection error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;