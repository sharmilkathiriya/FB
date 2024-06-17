import express from 'express';
import Food from '../models/FoodSchema.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Food
 *   description: Operations related to Food items
 */

/**
 * @swagger
 * /api/foods/createfood:
 *   post:
 *     summary: Create a new food item
 *     tags: [Food]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the food item
 *               price:
 *                 type: number
 *                 description: The price of the food item
 *               type:
 *                 type: string
 *                 description: The type/category of the food item
 *               image:
 *                 type: string
 *                 description: The URL of the food item's image
 *               hotelBrand:
 *                 type: string
 *                 description: The ID of the associated hotel brand
 *             required:
 *               - name
 *               - price
 *               - type
 *               - hotelBrand
 *     responses:
 *       201:
 *         description: The created food item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       500:
 *         description: Internal server error
 */
router.post('/createfood', async (req, res) => {
    try {
        const { name, price, type, image, hotelBrand } = req.body;

        const food = new Food({
            name,
            price,
            type,
            image,
            hotelBrand  // Assuming hotelBrand is provided as a valid ObjectId
        });

        await food.save();
        res.status(201).json(food);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/foods/getallfoods:
 *   get:
 *     summary: Get all food items
 *     tags: [Food]
 *     responses:
 *       200:
 *         description: List of food items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 *       500:
 *         description: Internal server error
 */
router.get('/getallfoods', async (req, res) => {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



/**
 * @swagger
 * /api/foods/{hotelBrandId}:
 *   get:
 *     summary: Get food items by hotel brand
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: hotelBrandId
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the hotel brand
 *     responses:
 *       200:
 *         description: List of food items for the specified hotel brand
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Food'
 *       500:
 *         description: Internal server error
 */
router.get('/foods/:hotelBrandId', async (req, res) => {
    try {
        const { hotelBrandId } = req.params;
        const foods = await Food.find({ hotelBrand: hotelBrandId });
        res.json(foods);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/foods/deletefood/{id}:
 *   delete:
 *     summary: Delete a food item by ID
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the food item
 *     responses:
 *       200:
 *         description: Food item deleted
 *       404:
 *         description: Food item not found
 *       500:
 *         description: Internal server error
 */
router.delete('/deletefood/:id', async (req, res) => {
    try {
        const food = await Food.findByIdAndDelete(req.params.id);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.status(200).json({ message: 'Food deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/foods/editfood/{id}:
 *   put:
 *     summary: Update a food item by ID
 *     tags: [Food]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the food item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the food item
 *               price:
 *                 type: number
 *                 description: The price of the food item
 *               type:
 *                 type: string
 *                 description: The type/category of the food item
 *               image:
 *                 type: string
 *                 description: The URL of the food item's image
 *     responses:
 *       200:
 *         description: The updated food item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Food'
 *       404:
 *         description: Food item not found
 *       500:
 *         description: Internal server error
 */
router.put('/editfood/:id', async (req, res) => {
    try {
        const { name, price, type, image } = req.body;
        const food = await Food.findById(req.params.id);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        food.name = name || food.name;
        food.price = price || food.price;
        food.type = type || food.type;
        food.image = image || food.image;
        await food.save();
        res.status(200).json(food);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
