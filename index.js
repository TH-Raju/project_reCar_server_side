const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const { default: dbConnect } = require('./utils/dbConnect');
const verifyJWT = require('./utils/verifyJWT');
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const app = express();

import paymentRoutes from "./routes/payment.route"

// middleware
app.use(cors());
app.use(express.json());



// DB
dbConnect();

// JWT Token
verifyJWT();


// Api Routes
app.use("/payment", paymentRoutes)


async function run() {
    try {
        const categoriyCollection = client.db('resaleHanding').collection('categoriy');
        const productCollection = client.db('resaleHanding').collection('product');
        const bookingCollection = client.db('resaleHanding').collection('bookings');
        const usersCollection = client.db('resaleHanding').collection('users');
        const paymentsCollection = client.db('resaleHanding').collection('payments');

        app.post('/payments', async (req, res) => {
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
        })


        app.get('/categoriy', async (req, res) => {
            const query = {};
            const options = await categoriyCollection.find(query).toArray();
            res.send(options);
        })


        app.put('/categoriy', async (req, res) => {
            const product = req.body;
            const filter = { _id: ObjectId(product.categorie) }
            const options = { upsert: true };
            const updatedDoc = {
                $push: {
                    product: product
                }
            }
            const result = await categoriyCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })

        app.post('/product', async (req, res) => {
            const product = req.body;
            const result = await productCollection.insertOne(product);
            res.send(result);
        })

        app.get('/product', async (req, res) => {
            const query = {};
            const options = await productCollection.find(query).toArray();
            res.send(options);
        })
        app.delete('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await productCollection.deleteOne(query);
            res.send(result);
        })


        app.get('/categoriy/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await categoriyCollection.findOne(query);
            res.send(result);
        })



        app.get('/categoriyProduct', async (req, res) => {
            const query = {}
            const result = await categoriyCollection.find(query).project({ name: 1 }).toArray();
            res.send(result);
        })

        // verifyJWT,
        app.get('/bookings', async (req, res) => {
            const email = req.query.email;
            // const decodedEmail = req.query.email;
            // if (email !== decodedEmail) {
            //     return res.status(403).send({ message: 'forbidden access' })
            // }
            const query = { buyerEmail: email };
            const bookings = await bookingCollection.find(query).toArray();
            res.send(bookings);
        });





        app.get('/bookings/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const booking = await bookingCollection.findOne(query);
            res.send(booking)
        })

        app.delete('/bookings/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await bookingCollection.deleteOne(query);
            res.send(result);
        })

        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingCollection.insertOne(booking);
            res.send(result);
        })

        app.post('/create-payment-intent', async (req, res) => {
            const buying = req.body;
            const price = buying.price;
            const amount = price * 100;

            const paymentIntent = await stripe.paymentIntents.create({
                currency: 'usd',
                amount: amount,
                'payment_method_types': [
                    'card'
                ]
            });
            res.send({
                clientSecret: paymentIntent.client_secret,
            })
        })

        app.get('/jwt', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const user = await usersCollection.findOne(query);
            if (user) {
                const token = jwt.sign({ email }, process.env.ACCESS_TOKEN)
                return res.send({ accessToken: token })
            }
            res.status(403).send({ accessToken: '' })
        })

        app.get('/users', async (req, res) => {
            const query = {}
            const users = await usersCollection.find(query).toArray();
            res.send(users);
        });

        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const result = await usersCollection.deleteOne(filter);
            res.send(result);
        })

        app.get('/users/admin/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await usersCollection.findOne(query);
            res.send({ isAdmin: user?.role === 'Admin' });
        })

        app.get('/users/seller/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await usersCollection.findOne(query);
            res.send({ isSeller: user?.role === 'Seller' });
        })

        app.post('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user);
            res.send(result);

        });

        // verifyJWT,
        app.put('/users/admin/:id', verifyJWT, async (req, res) => {
            const decodedEmail = req.decoded.email;
            const query = { email: decodedEmail };
            const user = await usersCollection.findOne(query);
            if (user?.role !== 'Admin') {
                return res.status(403).send(({ message: 'forbidden access' }))
            }


            const id = req.params.id;
            const filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    role: 'Admin'
                }
            }
            const result = await usersCollection.updateOne(filter, updatedDoc, options);
            res.send(result);
        })



    }
    finally {

    }
}
run().catch(console.log);



app.get('/', async (req, res) => {
    res.send('Server is working...');
})

app.listen(port, () => console.log(`Server running on ${port}...`))