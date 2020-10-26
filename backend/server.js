const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
//Allows us to connect to mongodb database

require("dotenv").config();
//Configures so we can have our enviroment vars in the .env file

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
//Middleware
app.use(express.json());
//Allows us to parse Json

//Our db will have collections exercises and users
//Each exercise has one user
///////mongodb connection//////////
const uri = process.env.ATLAS_URI;//This will be in the .env file
mongoose.connect(uri,{useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);
const connection= mongoose.connection;
//Once connection is open
connection.once("open", () => {
    console.log("MongoDB database connection established successfully");    
})
///////mongodb connection//////////


const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
//If user goes to exercises route, it will load everything in the 
//exercises file
app.use("/users", usersRouter);
//If user goes to users route, it will load everything in the 
//users file



app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
    //Template literals are surrounded by backticks in order to 
    //use placeholders such as ${port}
});
