const dbConnect = require("../utils/dbConnect");
const ObjectId = require("mongodb");
const usersCollection = dbConnect().db("resaleHanding").collection("users");

async function jwt(req, res) {
  const email = req.query.email;
  const query = { email: email };
  const user = await usersCollection.findOne(query);
  if (user) {
    const token = jwt.sign({ email }, process.env.ACCESS_TOKEN);
    return res.send({ accessToken: token });
  }
  res.status(403).send({ accessToken: "" });
}

module.exports = jwt;
