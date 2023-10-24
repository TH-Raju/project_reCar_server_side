const stripe = require("stripe")(process.env.STRIPE_SECRET);

export async function paymentIntent(req, res) {
  const buying = req.body;
  const price = buying.price;
  const amount = price * 100;

  const paymentIntent = await stripe.paymentIntents.create({
    currency: "usd",
    amount: amount,
    payment_method_types: ["card"],
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
