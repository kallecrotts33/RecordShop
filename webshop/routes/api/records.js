const express = require('express');
const router = express.Router();

// Directly import each model
const Record = require('../../models/Record');
const Artist = require('../../models/Artist');
const Genre = require('../../models/Genre');

// GET all records
router.get('/', async (req, res) => {
  try {
    const records = await Record.findAll({
      include: [Artist, Genre]  // include related artist and genre
    });
    res.json(records);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET one record by id
router.get('/:id', async (req, res) => {
  try {
    const record = await Record.findByPk(req.params.id, {
      include: [Artist, Genre]
    });
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new record
router.post('/', async (req, res) => {
  try {
    const { record_title, price, description, image_src, artist_id, genre_id } = req.body;
    const newRecord = await Record.create({ record_title, price, description, image_src, artist_id, genre_id });
    res.status(201).json(newRecord);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update a record
router.put('/:id', async (req, res) => {
  try {
    const record = await Record.findByPk(req.params.id);
    if (!record) return res.status(404).json({ error: 'Record not found' });

    await record.update(req.body);
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE a record
router.delete('/:id', async (req, res) => {
  try {
    const record = await Record.findByPk(req.params.id);
    if (!record) return res.status(404).json({ error: 'Record not found' });

    await record.destroy();
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
