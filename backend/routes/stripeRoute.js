import Stripe from "stripe";
import express from "express";
import { config } from "dotenv";

config();

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//route to create a stripe checkout session
router.post('/create-checkout-session', async (req,res) => {
    const { products, customerEmail } = req.body;

    const lineItems = products.map(product => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: product.name
            },
            unit_amount: product.priceInCents
        },
        quantity: product.quantity
    }))

    const productDetailsSerialized = JSON.stringify(products.map(product => ({
        name: product.name,
        quantity: product.quantity,
        price: product.priceInCents * 100
    })))

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            metadata: { productDetails: productDetailsSerialized },
            mode: 'payment',
            customer_email: customerEmail,
            billing_address_collection: 'required',
            success_url:`${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url:`${process.env.FRONTEND_URL}/cancel`
        })

        res.json({ id: session.id });
    } catch (error) {
        console.error('Failed to create checkout session: ', error.message);
        res.status(400).json({ message: 'Error creating a checkout session'});
    }
})


//route to retrieve a session by its ID
router.get('/api/session/:sessionId', async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

        const response = {
            customerEmail: session.customer_details.email,
            items: JSON.parse(session.metadata.productDetails),
            address: session.customer_details.address
        }

        res.json(response);
    } catch (error) {
        console.error('Failed to retrieve session:', error.message);
        res.status(400).json({ message: 'Error retrieving session details'})
    }
})

export default router;