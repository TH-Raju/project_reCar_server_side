const dbConnect = require("../utils/dbConnect");
const {ObjectId} = require("mongodb");

const bookingCollection = dbConnect()
  .db("resaleHanding")
  .collection("bookings");

async function getBookings(req, res) {
  const email = req.query.email;
  // const decodedEmail = req.query.email;
  // if (email !== decodedEmail) {
  //     return res.status(403).send({ message: 'forbidden access' })
  // }
  const query = { buyerEmail: email };
  const bookings = await bookingCollection.find(query).toArray();
  res.send(bookings);
}

async function getBookingsById(req, res) {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const booking = await bookingCollection.findOne(query);
  res.send(booking);
}

async function postBooking(req, res) {
  const booking = req.body;
  const result = await bookingCollection.insertOne(booking);
  res.send(result);
}

async function deleteBookingById(req, res) {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await bookingCollection.deleteOne(query);
  res.send(result);
}

module.exports = {
  getBookings: getBookings,
  getBookingsById: getBookingsById,
  postBooking: postBooking,
  deleteBookingById: deleteBookingById,
};
