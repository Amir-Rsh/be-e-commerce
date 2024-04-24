const { fetchClothes } = require("./app.models");

const getClothes = async (req, res, next) => {
  try {
    const { category, collection } = req.query;

    const clothes = await fetchClothes(category, collection);
    res.status(200).send({ clothes });
  } catch (error) {
    next(error);
  }
};

module.exports = { getClothes };
