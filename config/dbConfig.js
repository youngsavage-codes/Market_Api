const mongoose = require("mongoose"); // Removed redundant import
require("dotenv").config(); // Make sure this is at the top

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB database");
    } catch (err) {
        console.error("Database connection error:", err.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;