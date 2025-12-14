const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const checkIsAdmin = require('../../middleware/checkIsAdmin');

/**
 * @openapi
 * /api/users:
 *   get:
 *     summary: Lists all users
 *     responses:
 *       200:
 *         description: OK
 */

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Validation error
 */

/**
 * @openapi
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *       500:
 *         description: Database error
 */

/**
 * @openapi
 * /api/users/{id}:
 *   put:
 *     summary: Update an existing user
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *               isAdmin:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: User not found
 */

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the user
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Database error
 */

router.get('/', checkIsAdmin, userController.getAll);
router.get('/:id', checkIsAdmin, userController.getById);
router.post('/', checkIsAdmin, userController.create);
router.put('/:id', checkIsAdmin, userController.update);
router.delete('/:id', checkIsAdmin, userController.delete);

module.exports = router;
