const express = require("express");
const app = express();

require("dotenv").config();
PORT = process.env.PORT || 3000;

// middle ware
app.use(express.json());

// import routes
const blogRoute = require("./routes/blog.route");
//mount
app.use("/api/v1", blogRoute);

const dbConnect = require("./config/database");
dbConnect();

//server started
app.listen(PORT, () => {
    console.log("App start at the PORT : " + PORT);
});

//default route
app.get("/", (req, res) => {
    res.send(`<h1>ok home page 7439280437394820487</h1>`);
});
