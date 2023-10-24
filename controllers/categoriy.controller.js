import dbConnect from "../utils/dbConnect";

const categoriyCollection = dbConnect()
  .db("resaleHanding")
  .collection("categoriy");

export async function getCategoriy(req, res) {
  const query = {};
  const options = await categoriyCollection.find(query).toArray();
  res.send(options);
}

export async function putCategoriy(req, res) {
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


export async function getCategoriyById(req, res)  {
    const id = req.params.id;
    const query = { _id: ObjectId(id) };
    const result = await categoriyCollection.findOne(query);
    res.send(result);
}

export async function getCategoriyProduct (req, res) {
    const query = {}
    const result = await categoriyCollection.find(query).project({ name: 1 }).toArray();
    res.send(result);
}
