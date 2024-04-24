import mongoose from "mongoose";

const foodSchema = mongoose.Schema(
    {
        name: { type: String, required: true},
        priceInCents: { type: Number, required: true},
        image: { type: String, required: true}
    },
);

export const Food = mongoose.model('Food', foodSchema);