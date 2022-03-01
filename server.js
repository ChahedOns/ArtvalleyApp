const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
//config server
const app = express();

const port = process.env.PORT || 5000;
//Config middleware 
app.use(cors());
app.use(express.json());

app.listen (port , ()=> {
    console.log(`Server is running on port : ${port}`);
})

const uri = process.env.ARTVALLEY_DB_URI;

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true }, err => {
if(err) throw err;
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const usersRouter = require("./routes/users");

app.use("/users", usersRouter);

