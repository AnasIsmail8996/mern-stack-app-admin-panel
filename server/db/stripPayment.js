import dotenv from "dotenv";
dotenv.config();

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function testStripe() {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 500, 
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });

  console.log(paymentIntent.id);
}

testStripe();
