const mongoose = require("mongoose");

require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database");
    })
    .catch((err) => {
        console.error(err);
        console.log("Error connecting to the database");
        process.exit(1);
    })
}

module.exports = dbConnect;