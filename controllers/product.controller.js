import dbConnect from "../utils/dbConnect";
const productCollection = dbConnect().db("resaleHanding").collection("product");

export async function getProduct(req, res) {
  const query = {};
  const options = await productCollection.find(query).toArray();
  res.send(options);
}

export async function postProduct(req, res) {
  const product = req.body;
  const result = await productCollection.insertOne(product);
  res.send(result);
}

export async function deleteProduct(req, res) {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await productCollection.deleteOne(query);
  res.send(result);
}
