const { ObjectId } = require("mongodb");

module.exports = [
  {
    name: "vegan leather jacket",
    _id: new ObjectId("60b8d295f1d2f8c1f0e8c6b1"),
    collection: "winter",
    category: "coats",
    price: 29.99,
  },
  {
    name: "striped shirt",
    _id: new ObjectId("60b8d295f1d2f8c1f0e8c6b2"),
    collection: "spring",
    category: "shirt",
    price: 18.49,
  },
  {
    name: "strong jeans",
    _id: new ObjectId("60b8d295f1d2f8c1f0e8c6b3"),
    collection: "spring",
    category: "pants",
    price: 27.99,
  },
  {
    name: "warm hat",
    _id: new ObjectId("60b8d295f1d2f8c1f0e8c6b4"),
    collection: "winter",
    category: "hats",
    price: 12.49,
  },
];
