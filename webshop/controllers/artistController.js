const Artist = require('../models/Artist');

exports.getAll = async (req, res) => {
  try {
    const artists = await Artist.findAll();
    res.json(artists);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getById = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });
    res.json(artist);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.create = async (req, res) => {
  try {
    const artist = await Artist.create(req.body);
    res.status(201).json(artist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });
    await artist.update(req.body);
    res.json(artist);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const artist = await Artist.findByPk(req.params.id);
    if (!artist) return res.status(404).json({ error: 'Artist not found' });
    await artist.destroy();
    res.json({ message: 'Artist deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};