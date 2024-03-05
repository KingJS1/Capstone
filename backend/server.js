const express = require("express");
const { request, response } = require("http");
const server = express();
const mongoose = require("mongoose");
const User = require("./models/user");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv/config");
const port = 5173;
const db_uri = ""; //put our DB URI here

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

mongoose
  .connect(db_uri)
  .then((result) => {
    server.listen(port, () => {
      console.log(`Listening on ${port}...\nConnected to DB`);
    });
  })
  .catch((error) => console.log(error));

server.get("/", (request, response) => {
  response.send("LIVE!");
});

////////////////user registration post

server.post("/register", async (request, response) => {
  const newUser = new User({
    username: request.body.username,
  });
  newUser.password = newUser.generateHash(request.body.password);
  const saveUser = await newUser.save();
  saveUser
    ? response.send("New user has been created")
    : response.send("Failed to store new user");
});

///////////////user verification post

server.post("/login", async (request, response) => {
  const {username, password} = request.body
  await User.findOne({username}).then((user) => {
    if (user){
      bcrypt.compare(password, user.password, (err, res) => {
        if (err){
          response.send(err)
        }
        if (res){
          response.send("Welcome " + username + "!")
        } else {
          response.send("Incorrect user or password.")
        }
      });
    } else {
      response.send("User does not exist")
    }
  })
});