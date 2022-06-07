const express = require("express");
const bodyparser = require("body-parser");
const feedRoutes = require("./routes/feed");
const mongoose = require("mongoose");

const app = express();
app.use(bodyparser.json());

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

mongoose
  .connect("mongodb://localhost:27017/RESTpostsDB")
  .then((result) => {
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
