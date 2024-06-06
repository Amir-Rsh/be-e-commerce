const { ObjectId } = require("mongodb");
const client = require("../db/connection");
const dbString = process.env.NODE_ENV || "production";
const db = client.db(`${dbString}`);
const clothes = db.collection("clothes");

const fetchClothes = async (category, collection) => {
  try {
    let response;
    if (category && collection) {
      const categoryRegex = new RegExp(category, "i");
      const collectionRegex = new RegExp(collection, "i");
      response = await clothes
        .find({ category: categoryRegex, collection: collectionRegex })
        .toArray();
    }
    if (category && !collection) {
      const regex = new RegExp(category, "i");
      response = await clothes.find({ category: regex }).toArray();
    }
    if (collection && !category) {
      const regex = new RegExp(collection, "i");
      response = await clothes.find({ collection: regex }).toArray();
    }
    if (!category && !collection) {
      response = await clothes.find({}).toArray();
    }
    if (response === null) return Promise.reject({ msg: "Not found" });
    if (response.length === 0)
      return Promise.reject({
        msg: "there are no such clothes",
      });

    return response;
  } catch (error) {
    console.log(error);
  }
};

const fetchClothesById = async (id) => {
  try {
    if (id.length < 12) return Promise.reject({ msg: "item not found" });
    const response = await clothes.findOne({ _id: new ObjectId(id) });
    if (!response) return Promise.reject({ msg: "item not found" });
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { fetchClothes, fetchClothesById };
