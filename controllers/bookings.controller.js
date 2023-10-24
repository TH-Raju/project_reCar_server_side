import dbConnect from "../utils/dbConnect";
const bookingCollection = dbConnect()
  .db("resaleHanding")
  .collection("bookings");

export async function getBookings(req, res) {
  const email = req.query.email;
  // const decodedEmail = req.query.email;
  // if (email !== decodedEmail) {
  //     return res.status(403).send({ message: 'forbidden access' })
  // }
  const query = { buyerEmail: email };
  const bookings = await bookingCollection.find(query).toArray();
  res.send(bookings);
}

export async function getBookingsById(req, res) {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const booking = await bookingCollection.findOne(query);
  res.send(booking);
}

export async function postBooking(req, res) {
  const booking = req.body;
  const result = await bookingCollection.insertOne(booking);
  res.send(result);
}

export async function deleteBookingById(req, res) {
  const id = req.params.id;
  const query = { _id: ObjectId(id) };
  const result = await bookingCollection.deleteOne(query);
  res.send(result);
}
