const dbConnect = require("../utils/dbConnect");
const productCollection = dbConnect().db("resaleHanding").collection("product");
const {ObjectId} = require("mongodb");

async function getProduct(req, res) {
  const query = {};
  const options = await productCollection.find(query).toArray();
  res.send(options);
}

async function postProduct(req, res) {
  const product = req.body;
  const result = await productCollection.insertOne(product);
  res.send(result);
}

async function deleteProduct(req, res) {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await productCollection.deleteOne(query);
  res.send(result);
}

module.exports = {
  getProduct: getProduct,
  postProduct: postProduct,
  deleteProduct: deleteProduct,
};
