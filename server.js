const express = require("express");
const app = express();
const connectDB = require("./config/dbConfig");
require("dotenv").config();
const routes = require("./data/data");
const mongoose = require("mongoose")

// Connect to the database
connectDB();

app.use(express.json());

// Use routes
routes.forEach((routeObj) => {
    app.use(`/api/${process.env.API_VERSION}/`, routeObj.route);
});

// Start the server after successful database connection
mongoose.connection.once("open", () => {
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
});
