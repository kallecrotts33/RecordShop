const express = require('express');
const router = express.Router();
const artistController = require('../../controllers/artistController');
const checkIsAdmin = require('../../middleware/checkIsAdmin');

/**
 * @swagger
 * /api/artists:
 *   get:
 *     summary: Get all artists
 *     responses:
 *       200:
 *         description: List of all artists
 *   post:
 *     summary: Create a new artist
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               artist_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Artist created
 * /api/artists/{id}:
 *   get:
 *     summary: Get artist by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Artist found
 *   put:
 *     summary: Update an artist
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
 *               artist_name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Artist updated
 *   delete:
 *     summary: Delete an artist
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Artist deleted
 */

router.get('/', artistController.getAll);
router.get('/:id', artistController.getById);
router.post('/', checkIsAdmin, artistController.create);
router.put('/:id', checkIsAdmin, artistController.update);
router.delete('/:id', checkIsAdmin, artistController.delete);

module.exports = router;