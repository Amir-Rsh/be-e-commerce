const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getClothes, getClothesById } = require("./MVC/app.controllers");

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());

app.get("/clothes", getClothes);
app.get("/clothes/:id", getClothesById);

app.use((error, req, res, next) => {
  if (error.msg === "details required not completed") {
    res.status(400).send(error);
  }
  if (
    error.msg === "Not found" ||
    res.status(404).send(error) ||
    error.msg === "there are no such clothes" ||
    error.msg === "item not found"
  ) {
    res.status(404).send(error);
  }
});

module.exports = app;
