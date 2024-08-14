const express = require("express");
const app = express();
const connectDB = require("./config/dbConfig");
require("dotenv").config();
const routes = require("./data/data");
const mongoose = require("mongoose")
const cors = require('cors');


// Connect to the database
connectDB();


// Middleware
app.use(express.json());
app.use(cors());

// Use routes
routes.forEach((routeObj) => {
    app.use(`/api/${process.env.API_VERSION}/`, routeObj.route);
});

// Start the server after successful database connection
mongoose.connection.once("open", () => {
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});
