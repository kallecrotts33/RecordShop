const express = require('express');
const router = express.Router();
const genreController = require('../../controllers/genreController');
const checkIsAdmin = require('../../middleware/checkIsAdmin');

/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Get all genres
 *     responses:
 *       200:
 *         description: List of all genres
 *   post:
 *     summary: Create a new genre
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               genre_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: genre created
 * /api/genres/{id}:
 *   get:
 *     summary: Get genre by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: genre found
 *   put:
 *     summary: Update an genre
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               genre_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: genre updated
 *   delete:
 *     summary: Delete an genre
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: genre deleted
 */

router.get('/', genreController.getAll);
router.get('/:id', genreController.getById);
router.post('/', checkIsAdmin, genreController.create);
router.put('/:id', checkIsAdmin, genreController.update);
router.delete('/:id', checkIsAdmin, genreController.delete);

module.exports = router;