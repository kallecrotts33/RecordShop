const express = require('express');
const router = express.Router();
const recordController = require('../../controllers/recordController');

router.get('/', recordController.getAll);
router.get('/:id', recordController.getById);
router.post('/', recordController.create);
router.put('/:id', recordController.update);
router.delete('/:id', recordController.delete);

module.exports = router;