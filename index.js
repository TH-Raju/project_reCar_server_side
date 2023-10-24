const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const dbConnect = require("./utils/dbConnect");
// const verifyJWT = require("./utils/verifyJWT");
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const app = express();

const paymentRoutes = require("./routes/payment.route.js");
const categoriyRoutes = require("./routes/categoriy.route");
const categoriyProductRoutes = require("./routes/categoriyProduct.route");
const productRoutes = require("./routes/product.route");
const bookingsRoutes = require("./routes/bookings.route");
const paymentIntentRoutes = require("./routes/paymentIntent.route");
const userJWTRoutes = require("./routes/userJWT.route");
const usersRoutes = require("./routes/users.route");

// middleware
app.use(cors());
app.use(express.json());

// DB
dbConnect();

// JWT Token
// verifyJWT();

// Api Routes
app.use("/payment", paymentRoutes);
app.use("/categoriy", categoriyRoutes);
app.use("/categoriyProduct", categoriyProductRoutes);
app.use("/product", productRoutes);
app.use("/bookings", bookingsRoutes);
app.use("/create-payment-intent", paymentIntentRoutes);
app.use("/jwt", userJWTRoutes);
app.use("/users", usersRoutes);

// Default
app.get("/", async (req, res) => {
  res.send("Server is working...");
});

app.listen(port, () => console.log(`Server running on ${port}...`));
