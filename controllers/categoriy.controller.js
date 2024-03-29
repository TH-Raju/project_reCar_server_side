const dbConnect = require("../utils/dbConnect");
const { ObjectId } = require("mongodb");

const categoriyCollection = dbConnect()
  .db("resaleHanding")
  .collection("categoriy");

async function getCategoriy(req, res) {
  const query = {};
  const options = await categoriyCollection.find(query).toArray();
  res.send(options);
}

async function postCategoriy(req, res) {
  const categoriy = req.body;
  const result = await categoriyCollection.insertOne(categoriy);
  res.send(result);
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
  // console.log(id);
  const query = { _id: ObjectId(id) };
  const result = await categoriyCollection.findOne(query);
  // console.log(result);
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
  postCategoriy: postCategoriy,
  putCategoriy: putCategoriy,
  getCategoriyById: getCategoriyById,
  getCategoriyProduct: getCategoriyProduct,
};
