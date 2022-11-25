const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ddpko0x.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const categoriyCollection = client.db('resaleHanding').collection('categoriy');
        const bookingCollection = client.db('resaleHanding').collection('bookings');

        app.get('/categoriy', async (req, res) => {
            const query = {};
            const options = await categoriyCollection.find(query).toArray();
            res.send(options);
        })

        app.get('/categoriy/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await categoriyCollection.findOne(query);
            res.send(result);
        })

        app.get('/bookings', async (req, res) => {
            const email = req.query.email;
            const query = { buyerEmail: email };
            const bookings = await bookingCollection.find(query).toArray();
            res.send(bookings);
        })

        app.post('/bookings', async (req, res) => {
            const booking = req.body;
            const result = await bookingCollection.insertOne(booking);
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