const Record = require('../models/Record');
const Artist = require('../models/Artist');
const Genre = require('../models/Genre');

exports.getAll = async (req, res) => {
  try {
    const records = await Record.findAll({
      include: [
        { model: Artist, attributes: ['artist_id', 'artist_name'] },
        { model: Genre, attributes: ['genre_id', 'genre_name'] }
      ]
    });
    res.json(records);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.getById = async (req, res) => {
  try {
    const record = await Record.findByPk(req.params.id, {
      include: [
        { model: Artist, attributes: ['artist_id', 'artist_name'] },
        { model: Genre, attributes: ['genre_id', 'genre_name'] }
      ]
    });
    if (!record) return res.status(404).json({ error: 'Record not found' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};

exports.create = async (req, res) => {
  try {
    const record = await Record.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const record = await Record.findByPk(req.params.id);
    if (!record) return res.status(404).json({ error: 'Record not found' });
    await record.update(req.body);
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const record = await Record.findByPk(req.params.id);
    if (!record) return res.status(404).json({ error: 'Record not found' });
    await record.destroy();
    res.json({ message: 'Record deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Database error' });
  }
};