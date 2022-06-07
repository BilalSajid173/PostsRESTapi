const express = require("express");
const bodyparser = require("body-parser");
const feedRoutes = require("./routes/feed");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(bodyparser.json());
app.use("/images", express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorisation");
  next();
});
app.use("/feed", feedRoutes);

app.use((error, req, res, next) => {
  const message = error.message;
  res.status(error.statusCode).json({ message: message });
});

mongoose
  .connect("mongodb://localhost:27017/RESTpostsDB")
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
