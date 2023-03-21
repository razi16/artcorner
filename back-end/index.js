require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cors = require("cors");
const bodyParser = require("body-parser");

const userData = require("./src/schema/userSchema");

mongoose.connect(process.env.DB_HOST);

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);
app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "all good",
  });
});

const verifyJWT = (req, res, next) => {
  const token = req.headers["token"]?.split(" ")[1];
  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.json({
          isLoggedIn: false,
          message: "Authentication failed",
        });
      } else {
        req.user = {};
        req.user.id = decoded.id;
        req.user.username = decoded.username;
        next();
      }
    });
  } else {
    res.json({
      isLoggedIn: false,
      message: "Incorrect token given",
    });
  }
};

app.post("/register", async (req, res) => {
  const totalUser = await userData.find();
  const checkEmail = await userData.findOne({ email: req.body.email });
  if (checkEmail) {
    res.json({
      message: "This email is already registered",
    });
  } else {
    const cryptedPassword = await bcrypt.hash(req.body.password, 10);
    const data = await userData.create({
      id: totalUser.length + 1,
      username: req.body.username,
      email: req.body.email,
      password: cryptedPassword,
    });
    await data.save();
    res.json({
      message: "User created",
    });
  }
});

app.post("/login", async (req, res) => {
  const findUser = await userData.findOne({ email: req.body.email });
  if (findUser) {
    const checkPassword = await bcrypt.compare(
      req.body.password,
      findUser.password
    );
    if (checkPassword) {
      const payload = {
        id: findUser.id,
        username: findUser.username,
      };
      jwt.sign(payload, "secret", { expiresIn: 86400 }, (err, token) => {
        if (err) {
          res.json({
            message: err,
          });
        } else {
          res.json({ message: "Success", token: "Bearer " + token });
        }
      });
    } else {
      res.json({
        message: "The password is incorrect",
      });
    }
  } else {
    res.json({
      message: "This email doesn't exist in our database",
    });
  }
});

app.get("/auth", verifyJWT, (req, res) => {
  res.json({
    isLoggedIn: true,
    id: req.user.id,
    username: req.user.username,
  });
});

app.listen(4000);
