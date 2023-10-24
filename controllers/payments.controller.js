import dbConnect from "../utils/dbConnect";
const paymentsCollection = dbConnect().db('resaleHanding').collection('payments');


export async function payment(req, res) {
    const payment = req.body;
    const result = await paymentsCollection.insertOne(payment);
    const id = payment.bookingId
    const filter = { _id: ObjectId(id) }
    const updatedDoc = {
        $set: {
            paid: true,
            transactionId: payment.transactionId
        }
    }
    const updatedResult = await bookingCollection.updateOne(filter, updatedDoc)
    res.send(result)
}