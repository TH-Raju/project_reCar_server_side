const dbConnect = require("../utils/dbConnect");
const ObjectId = require("mongodb");

const categoriyCollection = dbConnect()
  .db("resaleHanding")
  .collection("categoriy");

async function getCategoriy(req, res) {
  const query = {};
  const options = await categoriyCollection.find(query).toArray();
  res.send(options);
}

async function putCategoriy(req, res) {
  const product = req.body;
  const filter = { _id: ObjectId(product.categorie) };
  const options = { upsert: true };
  const updatedDoc = {
    $push: {
      product: product,
    },
  };
  const result = await categoriyCollection.updateOne(
    filter,
    updatedDoc,
    options
  );
  res.send(result);
}

async function getCategoriyById(req, res) {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await categoriyCollection.findOne(query);
  res.send(result);
}

async function getCategoriyProduct(req, res) {
  const query = {};
  const result = await categoriyCollection
    .find(query)
    .project({ name: 1 })
    .toArray();
  res.send(result);
}

module.exports = {
  getCategoriy: getCategoriy,
  putCategoriy: putCategoriy,
  getCategoriyById: getCategoriyById,
  getCategoriyProduct: getCategoriyProduct,
};
