import express from 'express';
import { createHotelBrand, getAllHotelBrands, getHotelBrand, updateHotelBrand, deleteHotelBrand } from '../controllers/hotelBrandController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';
import validate from '../middlewares/validateMiddleware.js';
import hotelBrandSchema from '../validations/hotelBrandValidation.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Hotel Brand
 *   description: Operations related to Hotel Brands
 */
// {
//     "name": "Hotel 001",
//     "address": "Silver",
//     "phone": "789654123",
//     "adminName": "Hotel 001 Admin,
//     "adminEmail": "hotel001@admin.com",
//     "adminPassword": "Test@123" 
//   }
/**
 * @swagger
 * /api/hotelBrands:
 *   get:
 *     summary: Get all hotel brands
 *     tags: [Hotel Brand]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of hotel brands
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HotelBrand'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, requireRole(['super-admin']), getAllHotelBrands);

/**
 * @swagger
 * /api/hotelBrands/my:
 *   get:
 *     summary: Get the hotel brand associated with the authenticated user
 *     tags: [Hotel Brand]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The hotel brand associated with the user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HotelBrand'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Hotel brand not found
 */
router.get('/my', authenticate, requireRole(['super-admin', 'admin']), getHotelBrand);

/**
 * @swagger
 * /api/hotelBrands:
 *   post:
 *     summary: Create a new hotel brand
 *     tags: [Hotel Brand]
 *     security:
 *       - BearerAuth: []
 *     application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The Name of the Hotel
 *               address:
 *                 type: string
 *                 description: The Address of the Hotel Main office
 *               phone:
 *                 type: string
 *                 description: The Contect Number of the Hotel head office 
 *               adminName:
 *                 type: string
 *                 description: Admin Name of the Hotel head office
 *               adminEmail:
 *                 type: string
 *                 description: Admin Email of the Hotel head office
 *               adminPassword:
 *                 type: string
 *                 description: The  password of the Admin user
 *             required:
 *               - name
 *               - address
 *               - phone
 *               - adminName
 *               - adminEmail
 *               - adminPassword
 *     responses:
 *       201:
 *         description: The created hotel brand
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HotelBrand'
 *       400:
 *         description: Bad request
 */
router.post('/', authenticate, validate(hotelBrandSchema), createHotelBrand);

/**
 * @swagger
 * /api/hotelBrands/{id}:
 *   put:
 *     summary: Update a hotel brand
 *     tags: [Hotel Brand]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the hotel brand to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the hotel brand
 *               address:
 *                 type: string
 *                 description: The address of the hotel brand
 *               phone:
 *                 type: string
 *                 description: The phone number of the hotel brand
 *             required:
 *               - name
 *               - address
 *               - phone
 *     responses:
 *       200:
 *         description: The updated hotel brand
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HotelBrand'
 *       404:
 *         description: Hotel brand not found
 *       400:
 *         description: Bad request
 */
router.put('/edithotelBrand/:id', authenticate, requireRole(['super-admin']), validate(hotelBrandSchema), updateHotelBrand);

/**
 * @swagger
 * /api/hotelBrands/{id}:
 *   delete:
 *     summary: Delete a hotel brand
 *     tags: [Hotel Brand]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the hotel brand to delete
 *     responses:
 *       200:
 *         description: Hotel brand deleted
 *       404:
 *         description: Hotel brand not found
 *       400:
 *         description: Bad request
 */
router.delete('/deletehotelBrand/:id', authenticate, requireRole(['super-admin']), deleteHotelBrand);

export default router;
