import { Hyperswitch } from '@hyperswitch/node';
import { Request, Response } from 'express';

const hyperswitch = new Hyperswitch(process.env.HYPERSWITCH_API_KEY);

export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = 'USD' } = req.body;

    const paymentIntent = await hyperswitch.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      payment_method_types: ['card'],
      capture_method: 'automatic',
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Payment Intent Error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
};