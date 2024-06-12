const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getClothes, getClothesById } = require("./MVC/app.controllers");
const env = require("dotenv").config({ path: "./.env.stripe" });

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(bodyParser.json({ limit: "10mb" }));
app.use(cors());

app.get("/config", (req, res) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "eur",
      amount: 1999,
      payment_method_types: ["card"],
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    return res.status(400).send({ error: { message: err.message } });
  }
});

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
