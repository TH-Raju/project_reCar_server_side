const dbConnect = require("../utils/dbConnect");
const paymentsCollection = dbConnect()
  .db("resaleHanding")
  .collection("payments");
const bookingCollection = dbConnect()
  .db("resaleHanding")
  .collection("bookings");
const ObjectId = require("mongodb");

async function payment(req, res) {
  const payment = req.body;
  const result = await paymentsCollection.insertOne(payment);
  const id = payment.bookingId;
  const filter = { _id: ObjectId(id) };
  const updatedDoc = {
    $set: {
      paid: true,
      transactionId: payment.transactionId,
    },
  };
  const updatedResult = await bookingCollection.updateOne(filter, updatedDoc);
  res.send(result);
}

module.exports = payment;
