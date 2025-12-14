const express = require('express');
const router = express.Router();
const recordController = require('../../controllers/recordController');
const checkIsAdmin = require('../../middleware/checkIsAdmin');


/**
 * @openapi
 * /api/records:
 *   get:
 *     summary: Lists all records
 *     responses:
 *       200:
 *         description: OK
 */
router.get('/', recordController.getAll);

/**
 * @openapi
 * /api/records/{id}:
 *   get:
 *     summary: Get a record by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       404: { description: Not Found }
 */
router.get('/:id', recordController.getById);

/**
 * @openapi
 * /api/records:
 *   post:
 *     summary: Create a new record
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - record_title
 *               - price
 *               - description
 *               - artist_id
 *               - genre_id
 *               - image_src
 *             properties:
 *               record_title:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               description:
 *                 type: string
 *               image_src:
 *                 type: string
 *               artist_id:
 *                 type: integer
 *               genre_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */
router.post('/', checkIsAdmin, recordController.create);

/**
 * @openapi
 * /api/records/{id}:
 *   put:
 *     summary: Update a record by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               record_title:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               description:
 *                 type: string
 *               image_src:
 *                 type: string
 *               artist_id:
 *                 type: integer
 *               genre_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Not Found
 */
router.put('/:id', checkIsAdmin, recordController.update);

/**
 * @openapi
 * /api/records/{id}:
 *   delete:
 *     summary: Delete a record by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Deleted
 *       404:
 *         description: Not Found
 */
router.delete('/:id', checkIsAdmin, recordController.delete);

module.exports = router;
