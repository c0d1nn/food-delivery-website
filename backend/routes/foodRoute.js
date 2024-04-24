import express from "express";
import { Food } from "../models/foodModel.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

//creating a new food item
router.post('/', auth, async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.priceInCents ||
            !request.body.image
        ) {
            return response.status(400).send({
                message: 'Required fields are missing'
            })
        }

        const newFood = {
            name: request.body.name,
            priceInCents: request.body.priceInCents,
            image: request.body.image
        };

        const food = await Food.create(newFood);

        return response.status(201).send(food);
    } catch (error) {
        console.log(error.mesage);
        response.status(500).send({ message: error.message});
    }
});

//getting all food items
router.get('/', async (request, response) => {
    try {

        const food = await Food.find({});

        return response.status(200).json({
            data: food
        })

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


//deleting specific food item
router.delete('/:id', auth, async (request, response) => {
    try {

        const { id } = request.params;
        const result = await Food.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Item not found '});
        }

        response.status(200).json({message:'Item succesfully deleted', deletedItem: result});

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

//updating a food item
router.put('/:id', auth, async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.priceInCents
        ) {
            return response.status(400).send({
                message: 'Required fields are missing'
            }) 
        }

        const { id } = request.params;
        const result = await Food.findByIdAndUpdate(id, request.body, {
           new: true 
        });

        if (!result) {
            return response.status(404).json({ message: 'Food not found' });
        }

        return response.status(200).send({ message:'Food updated' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})


//getting a specific food item
router.get('/:id', async (request, response) => {
    try {

        const { id } = request.params;
        const food = await Food.findById(id);

        return response.status(200).json(food);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})




export default router;