import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customerEmail: { type: String, required: true},
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    items: [{
        name: String,
        quantity: Number
    }],
    address: {
        line1: String,
        line2: String,
        city: String,
        state: String,
        postal_code: String,
        country: String
    }
}, { timestamps: true })

export default mongoose.model('Order', orderSchema);