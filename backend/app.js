const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDb = require("./DB/db"); //default import
const userRouter = require("./Routes/user.routes");
const cookieParser = require("cookie-parser");
const captionRouter = require("./Routes/caption.route");


//function to connect with DB
connectToDb();

// middlewares
app.use(cors({
  origin:"*",
  credentials:true
})); //use the cors
app.use(express.json()); //used to parse the json request
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); //used so that we can interact with the front end cookies

app.use("/users", userRouter);  //user middleware
app.use('/caption',captionRouter)  //captain middleware

//basic route to check the server
app.get("/", (req, res) => {
  res.send("hello from the server");
});

module.exports = app; //exporting the varible app
