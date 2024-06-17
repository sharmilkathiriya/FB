import express from 'express';
import { createTable, getTables, updateTable, deleteTable } from '../controllers/tableController.js';
import { authenticate } from '../middlewares/authMiddleware.js';
import { requireRole } from '../middlewares/roleMiddleware.js';
import validate from '../middlewares/validateMiddleware.js';
import tableSchema from '../validations/tableValidation.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Table
 *   description: Operations related to Tables
 */

/**
 * @swagger
 * /api/tables:
 *   get:
 *     summary: Get all tables for the authenticated branch
 *     tags: [Table]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of tables
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Table'
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, requireRole(['sub-admin']), getTables);

/**
 * @swagger
 * /api/tables:
 *   post:
 *     summary: Create a new table
 *     tags: [Table]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *               capacity:
 *                 type: number
 *     responses:
 *       201:
 *         description: The created table
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Table'
 *       400:
 *         description: Bad request
 */
router.post('/', authenticate, requireRole(['sub-admin']), validate(tableSchema), createTable);

/**
 * @swagger
 * /api/tables/{id}:
 *   put:
 *     summary: Update an existing table
 *     tags: [Table]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The table id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               number:
 *                 type: string
 *               capacity:
 *                 type: number
 *     responses:
 *       200:
 *         description: The updated table
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Table'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Table not found
 */
router.put('/:id', authenticate, requireRole(['sub-admin']), updateTable);

/**
 * @swagger
 * /api/tables/{id}:
 *   delete:
 *     summary: Delete a table
 *     tags: [Table]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The table id
 *     responses:
 *       200:
 *         description: The deleted table
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Table deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Table not found
 */
router.delete('/:id', authenticate, requireRole(['sub-admin']), deleteTable);

export default router;
