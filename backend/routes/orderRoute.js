import express from "express";
import Order from "../models/orderModel.js";
import crypto from "crypto";
import { auth } from "../middleware/authMiddleware.js";
import { config } from "dotenv";

config();

const router = express.Router();

//fetching all the orders
router.get('/', async (req, res) => {
    const orders = await Order.find();

    res.json(orders);
})

//fetching a single order by id
router.get('/:id', async (req, res) => {
    const order = await Order.findById(req.params.id);

    res.json(order);
})

//updating an existing order
router.put('/:id', auth, async (req, res) => {
    const updateOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true});
    
    res.json(updateOrder);
})

//delete an order
router.delete('/:id', auth, async (req, res) => {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id);

    res.json(deletedOrder);
})

//creating a new order
router.post('/', async (req, res) => {
    const orderData = req.body;

    const orderId = crypto.createHash('sha256').update(JSON.stringify(orderData)).digest('hex');

    try {
        const existingOrder = await Order.findOne({ orderId });

        if (existingOrder) {
            return res.status(409).json({ message: 'Order already exists.' });
        }

        const order = new Order({ orderId, ...orderData });
        try {
            await order.save();
        } catch (error) {
            console.error('Error saving order: ', error.message);
            return res.status(500).send({ message: 'Error saving order: ' + error.message});
        }

        return res.status(201).json(order);

    } catch (error) {
        console.error('Error finding order: ', error.message);
        return res.status(500).send({ message: 'Error finding order: ' + error.message});
    }
})

export default router;