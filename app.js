const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getClothes } = require("./MVC/app.controllers");

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());

app.get("/clothes", getClothes);

app.use((error, req, res, next) => {
  if (error.msg === "details required not completed") {
    res.status(400).send(error);
  }
  if (error.msg === "Not found") {
    res.status(404).send(error);
  }
  if (error.msg === "there are no such clothes") {
    res.status(404).send(error);
  }
});

module.exports = app;
