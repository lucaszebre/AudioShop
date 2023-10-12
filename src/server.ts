import express from 'express'
import router from './routerPrivate'
import morgan from 'morgan'
import cors from 'cors'
import { protect } from './modules/auth'
import routerer from './routerPublic'
const app = express()
require("dotenv").config();

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(routerer)
app.use( protect, router)
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Fetch the publishable key to initialize Stripe.js
app.get("/publishable-key", () => {
  return { publishable_key: process.env.STRIPE_PUBLISHABLE_KEY };
})

// Create a payment intent and return its client secret
app.post("/create-payment-intent", async () => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "eur",
    payment_method_types: ["bancontact", "card"],
  });

  return { client_secret: paymentIntent.client_secret };
});

app.use((err, req, res, next) => {
  console.log(err)
  res.json({message: `had an error: ${err.message}`})
})

export default app