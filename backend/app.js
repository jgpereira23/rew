const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");

const app = express();

const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];

mongoose
  .connect(
    config.database.prefix +
      config.database.username +
      ":" +
      config.database.password +
      config.database.domain +
      config.database.db +
      config.database.params
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
    console.log("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user", userRoutes);

module.exports = app;
