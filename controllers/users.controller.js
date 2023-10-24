import dbConnect from "../utils/dbConnect";
const usersCollection = dbConnect().db("resaleHanding").collection("users");

export async function getUsers(req, res) {
  const query = {};
  const users = await usersCollection.find(query).toArray();
  res.send(users);
}

export async function postUser(req, res) {
  const user = req.body;
  const result = await usersCollection.insertOne(user);
  res.send(result);
}

export async function deleteUserById(req, res) {
  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const result = await usersCollection.deleteOne(filter);
  res.send(result);
}

export async function getAdmin(req, res) {
  const email = req.params.email;
  const query = { email };
  const user = await usersCollection.findOne(query);
  res.send({ isAdmin: user?.role === "Admin" });
}

export async function getSeller(req, res) {
  const email = req.params.email;
  const query = { email };
  const user = await usersCollection.findOne(query);
  res.send({ isSeller: user?.role === "Seller" });
}

export async function putToAdmin(req, res) {
  const decodedEmail = req.decoded.email;
  const query = { email: decodedEmail };
  const user = await usersCollection.findOne(query);
  if (user?.role !== "Admin") {
    return res.status(403).send({ message: "forbidden access" });
  }

  const id = req.params.id;
  const filter = { _id: ObjectId(id) };
  const options = { upsert: true };
  const updatedDoc = {
    $set: {
      role: "Admin",
    },
  };
  const result = await usersCollection.updateOne(filter, updatedDoc, options);
  res.send(result);
}
