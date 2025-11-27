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
    res.status(500).json({ error: 'Databasfel' });
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
    if (!record) return res.status(404).json({ error: 'Skiva ej funnen' });
    res.json(record);
  } catch (err) {
    res.status(500).json({ error: 'Databasfel' });
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
    if (!record) return res.status(404).json({ error: 'Skiva ej funnen' });
    await record.update(req.body);
    res.json(record);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const record = await Record.findByPk(req.params.id);
    if (!record) return res.status(404).json({ error: 'Skiva ej funnen' });
    await record.destroy();
    res.json({ message: 'Skiva raderad' });
  } catch (err) {
    res.status(500).json({ error: 'Databasfel' });
  }
};