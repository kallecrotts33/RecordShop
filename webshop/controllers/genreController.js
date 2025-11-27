const genre = require('../models/Genre');

exports.getAll = async (req, res) => {
  try {
    const genres = await genre.findAll();
    res.json(genres);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getById = async (req, res) => {
  try {
    const genre = await genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ error: 'genre not found' });
    res.json(genre);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.create = async (req, res) => {
  try {
    const genre = await genre.create(req.body);
    res.status(201).json(genre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const genre = await genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ error: 'genre not found' });
    await genre.update(req.body);
    res.json(genre);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const genre = await genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ error: 'genre not found' });
    await genre.destroy();
    res.json({ message: 'genre deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};