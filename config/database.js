const mongoose = require("mongoose"); // import the mongoose as the function is going to connect the application with the db

require("dotenv").config(); // this will load all the data in the .env file into the process object

// this is the function which connect the application with the database
const dbConnect = () => {
    mongoose
        .connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to the database");
        })
        .catch((err) => {
            console.error(err);
            console.log("Error connecting to the database");
            process.exit(1);
        });
};

// exports the function
module.exports = dbConnect;
